<template>
  <view class="content">
    <view class="inner_box">
      <view class="inner_title" style="z-index: 99;">
        请选择角色
      </view>
      <view class="inner_item" @click="toLogin('1')">
        <image class="logo" src="../../static/img/ganbu.png" mode=""></image>
        <text class="inner_text">我是代理</text>
        <image class="arrow" src="../../static/img/arrow.png" mode=""></image>
      </view>
      <view class="inner_item" @click="toLogin('2')">
        <image class="logo" src="../../static/img/nonghu.png" mode=""></image>
        <text class="inner_text">我是工人</text>
        <image class="arrow" src="../../static/img/arrow.png" mode=""></image>
      </view>
    </view>
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
      checked: true,
      src: "",
      scrollerHeight: '', //路径点集合 
      sessionId: ''
    }
  },
  onLaunch(options) {
    uni.showToast({
      title: options.query.scene,
      icon:'none'
    })
  },
  onLoad() {
  },
  mounted() {
  },
  methods: {
    toLogin(type){
      if(type=="1"){
        uni.reLaunch({
          url: '/pages/login/index'
        })
      }else{
				// 获取用户信息
				uni.getUserProfile({
					desc:"用于完善用户信息",
					success: (resp) => {
						this.$store.commit('getUserinfo', resp.userInfo)
						uni.showToast({
							icon:"none",
							title:'获取成功'
						})
            uni.login({
              provider: 'weixin',
              success: resd => {
                uni.request({
                  url: config.baseUrl+'/prod-api/weixin/api/ma/wxuser/login',
                  header: {
                    'app-id': 'wx9a60b1a091b01514',
                    'Content-Type': 'application/json;charset=UTF-8'
                  },
                  data: {
                    'jsCode': resd.code
                  },
                  method:'POST', 
                  success(res) {
                    uni.setStorageSync('loginType', '2')
                    uni.setStorageSync('sessionKey', res.data.data.sessionKey)
                    uni.reLaunch({
                      url: '/pages/home/index'
                    })
                  }
                })
              },
              fail: err => {
                console.log('登录失败：', err)
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
      }
    }
  }
}
</script>

<style scoped lang="scss">
.content{
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  background: #10AFA9;
  .inner_box{
    display: flex;
    flex-direction: column;
    align-items: center;
    .inner_title{
      font-size: 60rpx;
      font-weight: bold;
      margin: 212rpx 0 150rpx 0;
      color: #ffffff;
    }
    .inner_item{
      width: 590rpx;
      height: 240rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 64rpx;
      position: relative;
      border-radius: 16rpx;
      border: 1rpx solid rgba(255, 255, 255, 1);
      background: rgba(255, 255, 255, 0.3);
      .bg_img{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      }
      .logo{
        width: 144rpx;
        height: 144rpx;
        margin-right: 106rpx;
      }
      .inner_text{
        color: #ffffff;
        font-size: 40rpx;
      }
      .arrow {
        width: 32rpx;
        height: 32rpx;
        margin-left: 20rpx;
      }
    }
  }
}
</style>
