<template>
  <div class="select-login-page">
    <div class="content">
      <img class="logo" src="../../static/img/logo.png">
      <p class="text">君鼎JOB</p>
      <p class="sub-text">“带上好奇探索世界”</p>
      <button class="wechat-login" @click="toLogin">
        <img src="../../static/img/wechat.png">
        授权
      </button>
      <p class="remind-text">如果您点击授权，您将同意并授权</p>
      <p class="remind-text">
        <span class="blue">《用户服务协议》</span>、<span class="blue">《隐私政策》</span>
      </p>
    </div>
  </div>
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
    toLogin(){
      // 获取用户信息
      uni.getUserProfile({
        desc:"用于完善用户信息",
        success: (resp) => {
          this.$store.commit('getUserinfo', resp.userInfo)
          uni.showToast({
            icon:"none",
            title:'获取成功'
          })
          uni.setStorageSync('sessionKey', res.data.data.sessionKey)
          uni.reLaunch({
            url: '/pages/home/index'
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
</script>

<style scoped lang="scss">
.select-login-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #09b3ad;
  .content {
    width: 700rpx;
    height: calc(100vh - 600rpx);
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #FFFFFF;
    border-radius: 48rpx;
    .logo {
      width: 160rpx;
      height: 160rpx;
      margin: 80rpx 0 32rpx 0;
    }
    .text {
      font-size: 40rpx;
      font-weight: bold;
      line-height: 60rpx;
      color: #191D23;
    }
    .sub-text {
      font-size: 36rpx;
      font-weight: bold;
      line-height: 120rpx;
      color: #23272e;
    }
    .wechat-login {
      width: 584rpx;
      height: 116rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 200rpx;
      margin-bottom: 30rpx;
      border-radius: 60rpx;
      background: #10AFA9;
      color: #ffffff;
      line-height: 116rpx;
      img {
        width: 56rpx;
        height: 56rpx;
        margin-right: 25rpx;
      }
    }
    .remind-text {
      color: #aaaaaa;
      line-height: 40rpx;
      text-align: center;
      font-size: 30rpx;
      .blue {
        color: #10AFA9;
      }
    }
  }
}
</style>
