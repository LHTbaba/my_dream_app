import http from './interface.js' 
//登录 
const login = (params) => {
	return http.post('/vxLogin', params)
}
// 获取数据(根据传参的不同来获取不同的数据)
const getData = (params) => {
	return http.post('/loadDataNoReturnCA', params)
}
export default {
	login,
	getData
}


