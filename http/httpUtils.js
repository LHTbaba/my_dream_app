import http from './interface.js' 
//登录
const login = (params) => {
	return http.post('/prod-api/weixin/api/ma/wxuser/login', params)
}
//首页职位列表（代理角色） 
const getJobList = (params) => {
	return http.get('/prod-api/ptjob/ptjobspu/list', params)
}
//首页职位列表（工人角色） 
const getJobListTwo = (params) => {
	return http.getTwo('/prod-api/weixin/api/ma/ptjob/ptjobspu/list', params)
}
//职位详情（代理角色） 
const getJobInfo = (params) => {
	return http.get('/prod-api/ptjob/ptjobspu/' + params.id)
}
//职位详情（工人角色） 
const getJobInfoTwo = (params) => {
	return http.getTwo('/prod-api/weixin/api/ma/ptjob/ptjobspu/' + params.id)
}
// 获取数据(根据传参的不同来获取不同的数据)
const getData = (params) => {
	return http.post('/loadDataNoReturnCA', params)
}
export default {
	login,
	getJobList,
	getData,
	getJobListTwo,
	getJobInfo,
	getJobInfoTwo
}


