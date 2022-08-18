import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
let openid = uni.getStorageSync("openid")
let loginType = uni.getStorageSync("loginType")
let userInfo = uni.getStorageSync("userInfo")
const store=new Vuex.Store({
	state:{
		openid: openid ? openid : '',
		loginType: loginType ? loginType : false,
		userInfo: userInfo ? userInfo : {}
	},
	
	mutations:{
		login(state, loginData) {
			state.openid = loginData.openid
			uni.setStorageSync('openid', state.openid)
		},
		getUserinfo(state, userInfo) {
			state.userInfo = userInfo
			uni.setStorageSync('userInfo', state.userInfo)
		},
		logout(state) {
			state.openid = ''
			state.userInfo = {}
			state.loginType = ''
			uni.removeStorageSync('openid')
			uni.removeStorageSync('hasLogin')
			uni.removeStorageSync('userInfo')
			uni.removeStorageSync('loginType')
			uni.removeStorageSync('sessionId')
			uni.removeStorageSync('sessionKey')
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