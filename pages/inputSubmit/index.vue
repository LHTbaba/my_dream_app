<template>
  <view class="complain-panel">
    <img src="../../static/BANNER.png" class="top-pic">
    <view class="form-panel">
      <view class="input-item">
        <p class="input-title">{{title}}内容<span class="red">*</span></p>
      </view>
      <view class="text-area">
        <textarea v-model="form.content" maxlength="200" :placeholder="'请输入'+title+'内容'" />
      </view>
    </view>
		<view class="submit-panel">
			<button @click="submitForm">提交</button>
		</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: '诉求',
      type: '1',
      form: {
        areaValue: '20220302092915766566100001294101',
        content: ''
      }
    }
  },
  onLoad(option) {
    if(!this.$store.state.hasLogin) {
      uni.showToast({
        icon:"none",
        title:'请先登录！'
      })
      setTimeout(function() {
        uni.reLaunch({
          url: '/pages/user/index'
        })
      }, 1000)
    }
    this.type = option.type
    if(this.type == '1') {
      this.title = '诉求'
      uni.setNavigationBarTitle({
        title: '企业诉求'
      })
    }else {
      this.title = '建议'
      uni.setNavigationBarTitle({
        title: '投诉建议'
      })
    }
  },
  methods: {
    submitForm() {
      let noBlank = /\s+/g
      if(this.form.content === '') {
        uni.showToast({
          icon:"none",
          title:'请填写' + this.title + '内容！'
        })
        return
      }
      if(this.form.content) {
        if(noBlank.test(this.form.content)) {
          uni.showToast({
            icon:"none",
            title:'不能输入空格！'
          })
          return
        }
      }
      if(this.type === '1') {
        let formData = {
          'cmd.sqlKey': 'MSP_WX_LZY.MSP_SQ_ADD',
          'cmd.sqlType': 'proc',
          'cmd.QFLAG': '2',
          'cmd.IOPENID': this.$store.state.openid,	//openid
          'cmd.IWX_NAME': this.$store.state.nickName,	//微信名
          'cmd.IWX_SEX': this.$store.state.gender,	//微信性别
          'cmd.IWX_CITY': this.$store.state.city,	//微信城市
          'cmd.IWX_SF': this.$store.state.province,	//微信省份
          'cmd.IREGION_ID': this.form.areaValue,  //区县id
          'cmd.ICONTENT': this.form.content //诉求内容
        }
        this.$api.getData(formData).then(res => {
          uni.redirectTo({
            url: "/pages/complainList/index"
          })
        }).catch(err => {
          console.log(err)
        })
      }else {
        let formData = {
          'cmd.sqlKey': 'MSP_WX_LZY.MSP_SQ_ADD',
          'cmd.sqlType': 'proc',
          'cmd.QFLAG': '3',
          'cmd.IOPENID': this.$store.state.openid,	//openid
          'cmd.IWX_NAME': this.$store.state.nickName,	//微信名
          'cmd.IWX_SEX': this.$store.state.gender,	//微信性别
          'cmd.IWX_CITY': this.$store.state.city,	//微信城市
          'cmd.IWX_SF': this.$store.state.province,	//微信省份
          'cmd.IREGION_ID': this.form.areaValue,  //区县id
          'cmd.ICONTENT': this.form.content //诉求内容
        }
        this.$api.getData(formData).then(res => {
          uni.redirectTo({
            url: "/pages/complainList/index"
          })
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.complain-panel {
  .top-pic {
    width: 100vw;
    height: 230rpx;
  }
  .form-panel {
    padding: 36rpx;
    .input-item {
      width: 100%;
      height: 120rpx;
      display: flex;
      align-items: center;
      font-size: 34rpx;
      .input-title {
        width: 180rpx;
        .red {
          color: red;
        }
      }
      .select-panel {
        width: calc(100% - 180rpx);
        text-align: right;
      }
      .file-name {
        width: calc(100% - 50rpx);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .arrow {
        width: 50rpx;
      }
    }
    .border {
      border-bottom: 2rpx solid #cdd5dd;
    }
    .all {
      border-top: 2rpx solid #cdd5dd;
      border-bottom: 2rpx solid #cdd5dd;
    }
    .text-area {
      padding: 30rpx 0;
      border-bottom: 2rpx solid #cdd5dd;
      textarea {
        width: calc(100% - 60rpx);
        height: 250rpx;
        padding: 30rpx;
        background: #eeeeee;
        border-radius: 20rpx;
      }
    }
    .show-img{
      width: 180rpx;
      height: 180rpx;
      margin: 20rpx 20rpx 0 0;
    }
    .upload_box{
      padding: 0px 20rpx;
      overflow: hidden;
      .upload_item{
        width: 180rpx;
        height: 180rpx;
        float: left;
        margin-right: 20rpx;
        margin-top: 20rpx;
        position: relative;
        .uploadImg{
          width: 100%;
          height: 100%;
        }
        .delBtn{
          width: 50rpx;
          height: 50rpx;
          position: absolute;
          top: 0rpx;
          right: 0rpx;
          color: #ffffff;
          background: #CCCCCC;
          font-size: 30rpx;
          text-align: center;
          line-height: 50rpx;
        }
      }
      .upload_btn{
        width: 180rpx;
        height: 180rpx;
        box-sizing: border-box;
        border: 2px dashed #CCCCCC;
        display: flex;
        float: left;
        margin-right: 20rpx;
        margin-top: 20rpx;
        justify-content: center;
        align-items: center;
        img {
          width: 80rpx;
          height: 80rpx;
        }
      }
    }
  }
	.submit-panel {
		padding: 50rpx;
		button {
			color: #ffffff;
			background: #506AF0;
		}
	}
}
</style>
