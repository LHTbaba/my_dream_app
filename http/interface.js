import config from "./config.js";
import store from "../store"

const request = (options) => {
    return new Promise((resolve, reject) => {
		var sessionKey=uni.getStorageSync("sessionKey")
		var header={
			// 'Content-Type': 'application/json;charset=UTF-8',
			'app-id': 'wx9a60b1a091b01514',
			'third-session': sessionKey
		}; 
		// if(options.method=='POST'){
		// 	Object.assign(header,{'Content-Type':'application/x-www-form-urlencoded'} ) 
		// }
		uni.request({
			method: options.method,
			url: config.baseUrl + options.url,
			data: options.data,
			header: header,
			dataType: 'json'       
		}).then((response) => {
			let [error, res] = response     
			resolve(res.data)
			if(res.data.code === 401 || res.data.code === 60001 || res.data.code === 60002) {
				uni.showToast({
					title:"服务器请求错误",
					mask:false
				})
				// uni.reLaunch({
				// 	url: '/pages/select/index'
				// })
				store.commit('logout')
				uni.reLaunch({
					url: '/pages/home/index'
				})
			}
		}).catch(error => {
			let [err, res] = error
			reject(err)
			uni.showToast({
				title:"服务器请求错误",
				mask:false
			})
			store.commit('logout')
			uni.reLaunch({
				url: '/pages/home/index'
			})
		})
	})
}
export default{
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'  
		return  request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return  request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return  request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return request(options)
	}
}

