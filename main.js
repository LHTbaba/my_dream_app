import App from './App'
// #ifndef VUE3
import Vue from 'vue'
import store from "./store"
import api from './http/httpUtils.js'
import baseUrl from './http/config.js'
// 全局挂载后使用
Vue.prototype.$api = api
Vue.prototype.$store = store;
Vue.prototype.$baseUrl = baseUrl
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif