const setLoginInfo = function(loginInfo) {
	if(loginInfo && loginInfo != '') {
		uni.setStorageSync('loginInfo', JSON.stringify(loginInfo))
	} else {
		uni.removeStorageSync('loginInfo')	
	}
	
}
const getLoginInfo = function() {
	const loginInfo = uni.getStorageSync('loginInfo');
	if(loginInfo) {
		return JSON.parse(loginInfo)
	} else {
		return "";
	}
}
const setLoginUser = function(loginUser) {
	if(loginUser && loginUser != '') {
		uni.setStorageSync('loginUser', JSON.stringify(loginUser))
	} else {
		uni.removeStorageSync('loginUser')	
	}
}
const getLoginUser = function() {
	const loginUser = uni.getStorageSync('loginUser');
	if(loginUser) {
		return JSON.parse(loginUser)
	} else {
		return "";
	}
}
export default {
	setLoginInfo,
	getLoginInfo,
	setLoginUser,
	getLoginUser
}