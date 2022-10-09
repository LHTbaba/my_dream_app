import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
let isLogin = uni.getStorageSync("isLogin")
let userInfo = uni.getStorageSync("userInfo")
const store=new Vuex.Store({
	state:{
		isLogin: isLogin ? isLogin : false,
		userInfo: userInfo ? userInfo : {}
	},
	
	mutations:{
		getUserinfo(state, userInfo) {
			state.userInfo = userInfo
			uni.setStorageSync('userInfo', state.userInfo)
		},
		login(state) {
			state.isLogin = true
			uni.setStorageSync('isLogin', state.isLogin)
		},
		logout(state) {
			state.isLogin = false
			state.userInfo = {}
			uni.setStorageSync('isLogin', state.isLogin)
			uni.setStorageSync('userInfo', state.userInfo)
		}
	},
	actions:{
		login({commit}){
			commit("login")
		},
		getUserInfo(commit){
			commit("getUserinfo")
		},
		logout({commit}){
			commit('logout')
		}
	}
}); 
export default store