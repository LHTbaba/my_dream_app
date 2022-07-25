import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
let openid = uni.getStorageSync("openid")
let hasLogin = uni.getStorageSync("hasLogin")
let userInfo = uni.getStorageSync("userInfo")
const store=new Vuex.Store({
	state:{
		openid: openid ? openid : '',
		hasLogin: hasLogin ? hasLogin : false,
		userInfo: userInfo ? userInfo : {}
	},
	
	mutations:{
		login(state, loginData) {
			state.openid = loginData.openid
			state.hasLogin = true
			uni.setStorageSync('openid', state.openid)
			uni.setStorageSync('hasLogin', state.hasLogin)
		},
		getUserinfo(state, userInfo) {
			state.userInfo = userInfo
			uni.setStorageSync('userInfo', state.userInfo)
		},
		logout(state) {
			state.openid = ''
			state.userInfo = {}
			state.hasLogin = false
			uni.removeStorageSync('openid')
			uni.removeStorageSync('hasLogin')
			uni.removeStorageSync('userInfo')
		},
	},
	actions:{
		login({commit}){
			commit("login")
		},
		logout({commit}){
			commit('logout')
		}
	}
}); 
export default store