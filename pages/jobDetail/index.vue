<template>
  <div class="job-detail-page">
    <div class="info-panel">
      <div class="left">
        <p class="name">{{dataInfo.companyName}}</p>
        <p class="area">
          <i class="iconfont liht-zuobiaofill"></i>
          {{dataInfo.areaName}}
        </p>
      </div>
      <div class="right">{{dataInfo.salary}}/{{dataInfo.salaryStyle}}</div>
    </div>
    <div class="info-panel create-info">
      <img class="avatar" src="../../static/img/avatar.svg">
      <!-- <img class="avatar" :src="'https://www.jundinghr.com/prod-api' + dataInfo.sysUser.avatar"> -->
      <div class="info">
        <p class="name">{{dataInfo.sysUser.userName}}</p>
        <p class="remark">{{dataInfo.sysUser.remark}}</p>
      </div>
      <img src="../../static/img/call_icon.svg" class="call-icon" @click="callPhone">
    </div>
    <div class="info-panel">
      <p class="title">职位详情</p>
      <div class="tags-panel">
        <div class="tag-item" v-for="(item, index) in dataInfo.brightPoints" :key="index">{{item}}</div>
      </div>
      <div v-html="dataInfo.description"></div>
    </div>
    <div class="bottom" v-if="type === '2'">
      <button open-type="share" id="share" plain="true" >
        <i class="iconfont liht-fenxiang"></i>
        <p>分享</p>
      </button>
      <div class="button-opration" :class="{'active': dataInfo.orderType === '00'}" @click="collect">
        <i class="iconfont liht-shoucang"></i>
        <p>收藏</p>
      </div>
      <div class="button-publish" @click="apply">立即报名</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      type: '',
      dataInfo: {},
      brightList: []
    }
  },
  onLoad(params) {
    this.id = params.id
    this.type = uni.getStorageSync('loginType')
    this.getBrightDict()
  },
  mounted() {
    uni.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"]
    })
  },
  methods: {
    // 获取职位亮点字典
    getBrightDict() {
      if(uni.getStorageSync('loginType') === '1') {
        this.$api.getBrightDict().then(res => {
          this.brightList = res.rows
          this.fetchData()
        }).catch(err => {
          console.log(err)
        })
      }else if(uni.getStorageSync('loginType') === '2') {
        this.$api.getBrightDictTwo().then(res => {
          this.brightList = res.rows
          this.fetchData()
        }).catch(err => {
          console.log(err)
        })
      }
    },
    fetchData() {
      if(uni.getStorageSync('loginType') === '1') {
        this.$api.getJobInfo({
          id: this.id
        }).then(res => {
          this.dataInfo = res.data
          // 处理职位亮点
          this.dataInfo.brightPoints = this.dataInfo.brightPoints.split(',')
          this.dataInfo.brightPoints.map((inItem, index) => {
            this.brightList.map(bItem => {
              if(inItem === bItem.dictValue) {
                this.dataInfo.brightPoints[index] = bItem.dictLabel
              }
            })
          })
        }).catch(err => {
          console.log(err)
        })
      }else if(uni.getStorageSync('loginType') === '2') {
        this.$api.getJobInfoTwo({
          id: this.id
        }).then(res => {
          this.dataInfo = res.data
          // 处理职位亮点
          this.dataInfo.brightPoints = this.dataInfo.brightPoints.split(',')
          this.dataInfo.brightPoints.map((inItem, index) => {
            this.brightList.map(bItem => {
              if(inItem === bItem.dictValue) {
                this.dataInfo.brightPoints[index] = bItem.dictLabel
              }
            })
          })
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
    },
    collect() {
      this.$api.changeStatus({
        "ptjobSpuId": this.dataInfo.id,
        "userId": this.dataInfo.userId,
        "type": "00",
        "status": "00",
        "status2": "00",
      }).then(res => {
        if(res.code === 200) {
          uni.showToast({
            icon:"success",
            title:'收藏成功！'
          })
          // 刷新页面数据
          this.fetchData()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    apply() {
      this.$api.changeStatus({
        "ptjobSpuId": this.dataInfo.id,
        "userId": this.dataInfo.userId,
        "type": "01",
        "status": "01",
        "status2": "01",
      }).then(res => {
        if(res.code === 200) {
          uni.showToast({
            icon:"success",
            title:'报名成功！'
          })
          // 刷新页面数据
          this.fetchData()
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.job-detail-page {
  height: 100vh;
  padding: 0 38rpx 200rpx 38rpx;
  overflow: auto;
  background: #ffffff;
  box-sizing: border-box;
  .info-panel {
    width: 100%;
    padding: 50rpx 0;
    box-sizing: border-box;
    overflow: hidden;
    border-bottom: 1px solid #cfcbcb;
    .left {
      display: inline-block;
      vertical-align: top;
      width: 500rpx;
      .name {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 60rpx;
        font-weight: bold;
      }
      .area {
        width: 100%;
        margin-top: 26rpx;
        display: flex;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        i {
          color: #10AFA9;
        }
      }
    }
    .right {
      display: inline-block;
      vertical-align: top;
      width: 174rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 33rpx;
      text-align: right;
      color: #10AFA9;
    }
    .title {
      font-size: 38rpx;
      font-weight: bold;
      line-height: 80rpx;
    }
    .tags-panel {
      width: 100%;
      margin: 36rpx 0;
      display: flex;
      .tag-item {
        margin-right: 8rpx;
        padding: 0 16rpx;
        color: #717171;
        background: #95959522;
        line-height: 41rpx;
        font-size: 24rpx;
      }
    }
    .call-icon {
      width: 45rpx;
      height: 45rpx;
    }
  }
  .create-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .avatar {
      width: 96rpx;
      height: 96rpx;
      margin-right: 16rpx;
      border-radius: 50%;
    }
    .info {
      flex: 1;
      line-height: 50rpx;
      .name {
        font-size: 40rpx;
      }
      .remark {
        color: #615e5e;
        font-size: 26rpx;
      }
    }
  }
  .bottom {
    width: 100%;
    padding: 32rpx;
    display: flex;
    justify-content: space-between;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 180rpx;
    background: #ffffff;
    box-sizing: border-box;
    box-shadow: 0rpx 0rpx 40rpx rgba(0, 0, 0, 0.2);
    button {
      margin: 0;
      padding: 0;
      border: none;
      line-height: 46rpx;
      i {
        font-size: 48rpx;
      }
      p {
        font-size: 24rpx;
      }
    }
    .button-opration {
      text-align: center;
      i {
        font-size: 48rpx;
      }
      p {
        font-size: 24rpx;
      }
    }
    .button-publish {
      width: 450rpx;
      height: 90rpx;
      line-height: 90rpx;
      border-radius: 5rpx;
      color: #ffffff;
      background: #10AFA9;
      text-align: center;
      font-size: 42rpx;
    }
    .active {
      color: #10AFA9;
    }
  }
}
</style>
