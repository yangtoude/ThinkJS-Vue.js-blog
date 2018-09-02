const moment = require('moment');
const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {
  // token 生成
  async postAction() {
    const username = this.post('username');
    const password = this.post('password');
    const user = this.model('user');
    const currentLoginTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const userInfo = await user.where({ username: username }).find();
    if (think.isEmpty(userInfo)) {
      return this.fail('用户不存在');
    }
    const result = user.verifyPassword(userInfo, password);
    if (think.isEmpty(result)) {
      return this.fail('密码不正确');
    }
    delete userInfo.password;
    delete userInfo.encrypt;

    // 最近一次登录时间last_login_time为上一次的登录时间
    // 当前登录时间current_login_time更新为当前登录时间
    const last_login_time = userInfo.current_login_time;
    const data = {
      current_login_time: currentLoginTime,
      last_login_time: last_login_time
    };
    const rows = await user.where({ username: username }).update(data);

    if (rows) {
      await this.hook('userUpdate', data);
    }

    const token = await this.session('userInfo', userInfo);
    return this.success({ token: token });
  }
};
