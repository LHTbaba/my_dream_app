import http from './interface.js' 
//登录
const login = (params) => {
	return http.post('/prod-api/weixin/api/ma/wxuser/login', params)
}
//是否录入信息（工人角色）
const isLogdata = (params) => {
	return http.get('/prod-api/weixin/api/ma/ptjob/wxuseradd/infoflag', params)
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
// 获取字典（工人角色）
const getDict = (params) => {
	return http.get('/prod-api/weixin/api/ma/system/dict/data/list', params)
}
//搜索职位列表（工人角色）
const searchJobList = (params) => {
	return http.get('/prod-api/weixin/api/ma/ptjob/ptjobOrderInfo/list', params)
}
//获取用户手机号（工人角色）
const getPhoneNumber = (params) => {
	return http.post('/prod-api/weixin/api/ma/wxuser/phonenumber', params)
}
//采集信息录入（工人角色）
const completeInfo = (params) => {
	return http.post('/prod-api/weixin/api/ma/ptjob/wxuseradd', params)
}
//查询代理信息（工人角色）
const fetchAgencyInfo = (params) => {
	return http.get('/prod-api/weixin/api/ma/System/user/' + params.id)
}
//查询基本信息（工人角色）
const fetchInfo = (params) => {
	return http.get('/prod-api/weixin/api/ma/ptjob/wxuseradd/infonoid', params)
}
export default {
	login,
	isLogdata,
	getJobList,
	getJobInfo,
	changeStatus,
	getDict,
	searchJobList,
	getPhoneNumber,
	completeInfo,
	fetchAgencyInfo,
	fetchInfo
}


