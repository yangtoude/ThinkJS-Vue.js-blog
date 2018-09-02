import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import axios from './axios'
import VueAxios from 'vue-axios'
import { sync } from 'vuex-router-sync'
import moment from 'moment'

// 插件
Vue.use(Vuex)
Vue.use(VueAxios, axios)
sync(store, router)

// 全局日期格式化过滤器
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

// 配置
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
