<template>
	<view class="login" id="wrap" style="width: 100vw;height: 100vh;">
		<scroll-view :style="{height:scrollerHeight}" scroll-y="true">
			<view class="top-img">
				<!-- <image class="img" src="../../static/img/fp_title.svg"></image> -->
			</view>
			<view class="main">
				<view class="login_tips">
					账号
				</view>
				<view class="main-item">
					<input type="text" placeholder="请输入用户名" v-model="loginName" placeholder-class="placeholder" />
				</view>
				<view class="login_tips">
					密码
				</view>
				<view class="main-item">
					<input type="password" placeholder="请输入密码" v-model="password" placeholder-class="placeholder" />
				</view>
				<view class="login_tips">
					验证码
				</view>
				<view class="main-item code" style="overflow: hidden;">
					<view class="verification-code">
						<input type="text" placeholder="请输入验证码" v-model="authcode" placeholder-class="placeholder" />
						<image id="imgCanvas" :src="src" @click="getCode()"></image> 
					</view>
				</view>
			</view>
			<view class="button-box">
				<button type="default" class="login-btn" @click="login()">登录</button>
			</view>
			<view class="checked-box">
				<label class="keep-password">
					<checkbox class="keep-password" :checked="checked" @click="oncheckbox">记住密码</checkbox>
				</label>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import config from "../../http/config.js";
	export default {
		data() {
			return {
				loginName: '',
				password: '',
				authcode: '',
				codeSrc: '',
				verCode: "",
				width: ' ',
				height: ' ',
				title: '登录',
				checked: true,
				src: "",
				sessionId: '',
			}
		},
		onLoad() {
			let userName = uni.getStorageSync("userName");
			let passWord = uni.getStorageSync("passWord");
			this.loginName = userName;
			this.password = passWord;
		},
		mounted() {
			// this.getCode()
		},
		methods: {
			getCode() {
				var _this = this;
				uni.request({
					url: config.baseUrl + '/Imagexcx.img?data=' + new Date(), //仅为示例，并非真实接口地址。 
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					method: 'GET', //请求方式  或GET，必须为大写
					success: res => {
						if (res.data.code == "0") {
							let str = res.data.data.valicode.replace(/\. +/g, '')
							str = str.replace(/[\r\n]/g, '')
							_this.src = ' data:image/jpeg;base64,' + str;
							_this.sessionId = res.data.data.JESSIONID
							uni.setStorageSync('sessionId',res.data.data.JESSIONID);
						} else {
              uni.showToast({
                title: '验证码获取失败',
                icon:'none'
              })
						}
					},
					fail: err => {
						uni.showToast({
							icon: 'none',
							title: '请求出错: ' + err,
							duration: 2000
						});
					}
				})
			},
			login() {
				if (this.loginName == '') {
					uni.showToast({
						icon: 'none',
						title: '账号不能为空！',
						duration: 1500
					});
					return false
				}
				if (this.password == '') {
					uni.showToast({
						icon: 'none',
						title: '密码不能为空！',
						duration: 1500
					});
					return false
				};
				if (this.authcode == '') {
					uni.showToast({
						icon: 'none',
						title: '验证码不能为空！',
						duration: 1500
					});
					return false
				};
				if (this.checked) {
          uni.setStorageSync('userName', this.loginName);
          uni.setStorageSync('passWord', this.password);
				} else {
          uni.setStorageSync('userName', '');
          uni.setStorageSync('passWord', '');
				}
				let formObj = {
					loginName: this.loginName,
					passWord: this.password,
					authCode: this.authcode
				}
				uni.showLoading({
					title: '登录中...'
				})
				// 获取用户信息
				uni.getUserProfile({
					desc:"用于完善用户信息",
					success: (resp) => {
						this.$store.commit('getUserinfo', resp.userInfo)
						uni.showToast({
							icon:"none",
							title:'获取成功'
						})
						uni.request({
							url: config.baseUrl + '/prod-api/login', //仅为示例，并非真实接口地址。 
							header: {
								'Content-Type': 'application/json;charset=UTF-8'
							},
							data: {
								'username': formObj.loginName,
								'password': formObj.passWord,
								'code': formObj.authCode,
								'uuid': "a9bf23f26ece44aca6d6829d376f0d7e"
							},
							method: 'POST', //请求方式  或GET，必须为大写
							success: res => {
								uni.hideLoading();
								if (res.data.code === 200) {
									uni.reLaunch({
										url: '/pages/home/index'
									})
									uni.setStorageSync('token', res.data.token)
								}else {
									uni.showToast({
										title: res.data.msg,
										icon:'none'
									})
									this.getCode()
								}
							},
							fail: err => {
								uni.showToast({
									icon: 'none',
									title: '请求出错: ' + err
								})
							}
						})
					},
					fail: (err) => {
						console.log(err)
						uni.showToast({
							icon:"none",
							title:'用户拒绝获取'
						})
					}  
				})
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			oncheckbox(item) {
				this.checked = !this.checked;
			}
		}
	}
</script>

<style>
	.login {
		width: 100%;
		height: 100vh;
		overflow: hidden;
	}

	#imgCanvas {
		width: 190rpx;
		height: 70rpx;
	}

	.top-img {
		text-align: center;
		margin: 104rpx auto;
	}

	.top-img>.img {
		display: inline-block;
		width: 200rpx;
		height: 200rpx;
	}
    .login_title{
		margin: 0rpx auto 20rpx;
		font-size: 40rpx;
		font-weight: bold;
		width: 75%; 
		color: #192321;
		letter-spacing: 2%;
	}
	.login_tips{
		margin:auto;
		font-size: 30rpx;
		line-height: 80rpx;
		width: 75%; 
		color: rgb(186, 190, 190);
		letter-spacing: 2%;
	}
	.app-title {
		font-family: PangMenZhengDao;
		font-weight: bold;
		font-size: 50rpx;
		color: #2151F4;
		text-align: center;
		padding-top: 10rpx;
		letter-spacing: 2px;
	}

	.login .main-item { 
		display: flex;
		align-items: center;
		width: 75%;
		padding-bottom: 20rpx;
		border-bottom: 1px solid rgba(25, 87, 115,.1);
		height:80rpx;
		margin: auto; 
		box-sizing: border-box;
	}

	.login .main-item.code {
		position: relative;
	}

	.main-item .icon {
		display: inline-block;
		width: 40rpx;
		height: 40rpx;
	}

	.login .main-item input {
		font-size: 32rpx;
		color: #192321; 
		flex: 1;
		box-sizing: border-box;
	}

	.verification-code {
		display: flex;
		width: 100%;
		align-items: center;
	}

	.verification-code input {
		width: calc(100% - 160rpx);
	}

	.verification-code .img {
		position: absolute;
		right: 0;
		top: 0;
		width: 200rpx;
		height: 100rpx;
		border: 0;
		border-radius: 0 200rpx 200rpx 0;
	}

	.login .button-box {
		margin-top: 46rpx;
	}

	.login .button-box .login-btn {
		width: 75%;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 4rpx;
		background: rgb(11, 176, 127);
		font-size: 32rpx;
		color: #ffffff;
	}

	.checked-box {
		width: 80%;
		margin: 0 auto;
		padding-left: 50rpx;
	}

	.login .keep-password {
		color: #A9B7B5;
		font-size: 28rpx;
		padding-top: 26rpx;

	}

	/*checkbox 选项框大小  */
	checkbox .wx-checkbox-input {
		width: 35rpx;
		height: 35rpx;
	}

	/*checkbox选中后样式  */
	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		background: #fff;
	}

	/*checkbox选中后图标样式  */
	checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
		width: 28rpx;
		height: 28rpx;
		line-height: 28rpx;
		text-align: center;
		font-size: 22rpx;
		color: #345BC4;
		background: transparent;
		transform: translate(-50%, -50%) scale(1);
		-webkit-transform: translate(-50%, -50%) scale(1);
	}
</style>
