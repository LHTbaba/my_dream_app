import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
let loginType = uni.getStorageSync("loginType")
let userInfo = uni.getStorageSync("userInfo")
const store=new Vuex.Store({
	state:{
		loginType: loginType ? loginType : false,
		userInfo: userInfo ? userInfo : {}
	},
	
	mutations:{
		getUserinfo(state, userInfo) {
			state.userInfo = userInfo
			uni.setStorageSync('userInfo', state.userInfo)
		},
		logout(state) {
			state.userInfo = {}
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