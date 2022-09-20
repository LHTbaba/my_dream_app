import http from './interface.js' 
//登录
const login = (params) => {
	return http.post('/prod-api/weixin/api/ma/wxuser/login', params)
}
//首页职位列表（工人角色）
const getJobList = (params) => {
	return http.get('/prod-api/weixin/api/ma/ptjob/ptjobspu/list', params)
}
//职位详情（工人角色）
const getJobInfo = (params) => {
	return http.get('/prod-api/weixin/api/ma/ptjob/ptjobspu/' + params.id)
}
// 收藏、报名（工人角色）
const changeStatus = (params) => {
	return http.post('/prod-api/weixin/api/ma/ptjob/ptjobOrderInfo', params)
}
// 获取职位亮点字典（工人角色）
const getBrightDict = (params) => {
	return http.get('/prod-api/weixin/api/ma/system/dict/data/list', params)
}
//搜索职位列表（工人角色）
const searchJobList = (params) => {
	return http.get('/prod-api/weixin/api/ma/ptjob/ptjobOrderInfo/list', params)
}
export default {
	login,
	getJobList,
	getJobInfo,
	changeStatus,
	getBrightDict,
	searchJobList
}


