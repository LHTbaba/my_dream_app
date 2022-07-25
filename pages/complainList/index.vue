<template>
  <view class="complainList-panel">
    <view class="search-panel">
      <uni-search-bar v-model="searchValue" radius="100" placeholder="可查询企业名称、联系人" cancelButton="none" @confirm="fetchData" />
    </view>
    <view class="list-item" v-for="(item, index) in dataList" :key="index" @click="goDetail(item)">
      <p class="item-text">{{item.COMPANY_NAME ? item.COMPANY_NAME : item.CONTENT}}</p>
      <view class="item-flag" v-if="item.DJ_STATE === '002'">办理中</view>
      <view class="item-flag" v-if="item.DJ_STATE === '003'">已办理</view>
      <view class="item-flag" v-if="item.DJ_STATE === '004'">已办结</view>
    </view>
    <view class="no-data" v-if="total == 0">
      <img src="../../static/no-data.png">
      <p>当前暂无该状态诉求</p>
    </view>
    <view class="no-data" v-if="noMore">
      <p>没有更多了</p>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
      searchValue: '',
      status: '',
      pageSize: 10,
      pageIndex: 1,
      total: 0,
      noMore: false
    }
  },
  onLoad(option) {
    this.status = option.status ? option.status : ''
  },
  onShow() {
    this.pageIndex = 1
    this.fetchData()
  },
  onReachBottom() {
    if(this.pageSize * this.pageIndex < this.total) {
      this.pageIndex++
      uni.showLoading()
      this.$api.getData({
        'cmd.sqlKey': 'MSP_WX_LZY.MSP_SQ_LIST_VX',
        'cmd.sqlType': 'proc',
        'cmd.QOPENID': this.$store.state.openid,	//openid
        'cmd.QCOMPANYNAME': this.searchValue, //模糊查询
        'cmd.QSTATE': this.status,  //诉求状态
        'cmd.QPAGENUM': this.pageIndex, //页数
        'cmd.QPAGESIZE': this.pageSize, //页大小
      }).then(res => {
        this.dataList = this.dataList.concat(res[0].LIST)
        uni.hideLoading()
      }).catch(err => {
        console.log(err)
      })
    }else {
      this.noMore = true
    }
  },
  methods: {
    fetchData() {
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
      uni.showLoading()
      this.$api.getData({
        'cmd.sqlKey': 'MSP_WX_LZY.MSP_SQ_LIST_VX',
        'cmd.sqlType': 'proc',
        'cmd.QOPENID': this.$store.state.openid,	//openid
        'cmd.QCOMPANYNAME': this.searchValue, //模糊查询
        'cmd.QSTATE': this.status,  //诉求状态
        'cmd.QPAGENUM': this.pageIndex, //页数
        'cmd.QPAGESIZE': this.pageSize, //页大小
      }).then(res => {
        this.dataList = res[0].LIST
        this.total = res[0].TOTALCOUNT
        uni.hideLoading()
      }).catch(err => {
        console.log(err)
      })
    },
    goDetail(item) {
      uni.navigateTo({
        url: `/pages/complain/index?type=detail&id=${item.ID}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.complainList-panel {
	height: 100vh;
	background: #F9FAFB;
  .search-panel {
    width: 100vw;
    height: 230rpx;
    padding: 100rpx 80rpx 0 80rpx;
    box-sizing: border-box;
    background: rgb(74, 153, 243);
  }
  .list-item {
    width: 90%;
    height: 180rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30rpx auto;
    background: #ffffff;
    border-radius: 20rpx;
    .item-text {
      padding-left: 20rpx;
      width: calc(100% - 200rpx);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .item-flag {
      width: 200rpx;
      height: 80rpx;
      background: orange;
      border-radius: 50rpx 0 0 50rpx;
      line-height: 80rpx;
      text-align: center;
      color: #ffffff;
    }
  }
  .no-data {
    margin-bottom: 50rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 300rpx;
      height: 300rpx;
    }
    p {
      font-size: 30rpx;
      color: #999999;
    }
  }
}
</style>
