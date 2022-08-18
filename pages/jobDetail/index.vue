<template>
  <div class="job-detail-page">
    <div class="info-panel">
      <p class="salary">{{dataInfo.salary}}/{{dataInfo.salaryStyle}}</p>
      <p class="work-method">{{dataInfo.workMethod}}</p>
      <img src="../../static/img/salary_icon.svg" class="salary-icon">
    </div>
    <div class="info-panel" v-html="dataInfo.description"></div>
    <div class="info-panel create-info">
      <img class="avatar" :src="'https://www.jundinghr.com/prod-api' + dataInfo.sysUser.avatar" v-if="dataInfo.sysUser.avatar">
      <img class="avatar" src="../../static/img/avatar.svg" v-else>
      <div class="info">
        <p class="name">{{dataInfo.sysUser.userName}}</p>
        <p class="remark">{{dataInfo.sysUser.remark}}</p>
        <p class="remark">电话：{{dataInfo.sysUser.phonenumber}}</p>
        <img src="../../static/img/call_icon.svg" class="call-icon" @click="callPhone">
      </div>
    </div>
    <div class="bottom" v-if="type === '2'">
      <div class="button-item active">收藏</div>
      <div class="button-item active">报名</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      type: '',
      dataInfo: {}
    }
  },
  onLoad(params) {
    this.id = params.id
    this.type = uni.getStorageSync('loginType')
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      if(uni.getStorageSync('loginType') === '1') {
        this.$api.getJobInfo({
          id: this.id
        }).then(res => {
          this.dataInfo = res.data
        }).catch(err => {
          console.log(err)
        })
      }else if(uni.getStorageSync('loginType') === '2') {
        this.$api.getJobInfoTwo({
          id: this.id
        }).then(res => {
          this.dataInfo = res.data
        }).catch(err => {
          console.log(err)
        })
      }
    },
    callPhone() {
      uni.showModal({
        title: '提示',
        content: '确认拨打电话？',
        success: (res) => {
          if (res.confirm) {
            uni.makePhoneCall({
              phoneNumber: this.dataInfo.sysUser.phonenumber
            })
          } else if (res.cancel) {
            return
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.job-detail-page {
  height: 100vh;
  padding: 32rpx 32rpx 200rpx 32rpx;
  overflow: auto;
  background: #eeeeee;
  box-sizing: border-box;
  .info-panel {
    position: relative;
    width: 100%;
    margin: 32rpx 0;
    padding: 16rpx;
    border-radius: 10px;
    background: #ffffff;
    box-sizing: border-box;
    overflow: hidden;
    .salary {
      color: red;
      font-size: 48rpx;
      font-weight: bold;
      line-height: 100rpx;
    }
    .work-method {
      color: orange;
      font-size: 32rpx;
    }
    .salary-icon {
      position: absolute;
      width: 130rpx;
      height: 130rpx;
      top: 20rpx;
      right: 60rpx;
    }
    .call-icon {
      position: absolute;
      width: 90rpx;
      height: 90rpx;
      top: 30rpx;
      right: 50rpx;
    }
  }
  .create-info {
    display: flex;
    align-items: center;
    .avatar {
      width: 96rpx;
      height: 96rpx;
      margin-right: 16rpx;
      border-radius: 50%;
    }
    .info {
      line-height: 40rpx;
      .name {
        font-size: 40rpx;
      }
      .remark {
        font-size: 26rpx;
      }
    }
  }
  .bottom {
    width: 100%;
    display: flex;
    justify-content: space-around;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 180rpx;
    background: #ffffff;
    .button-item {
      margin-top: 32rpx;
      width: 120rpx;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 20rpx;
      color: rgb(11, 27, 53);
      background: rgb(235, 235, 192);
      text-align: center;
    }
    .active {
      color: rgb(241, 246, 247);
      background: rgb(254, 137, 3);
    }
  }
}
</style>
