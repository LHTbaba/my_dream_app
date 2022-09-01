<template>
  <div class="cjpf-page">
    <div class="header-bar">
      <div class="search">
        <uni-search-bar v-model="searchKey" radius="100" placeholder="搜索企业" bgColor="#74d4cf" clearButton="none" cancelButton="none" @confirm="search" />
      </div>
      <div class="change-panel">
        <p class="change-text" :class="{'active': type === '1'}" @click="changeType('1')">线上兼职</p>
        <p class="change-text" :class="{'active': type === '2'}" @click="changeType('2')">线下兼职</p>
      </div>
    </div>
    <scroll-view class="content-panel" scroll-y="true" @scrolltolower="scrolltolower">
      <div class="content-item" v-for="(item, index) in dataList" :key="index">
        <div class="line-one">
          <p class="left">{{item.companyName}}</p>
          <p class="right">{{item.salary}}/{{item.salaryStyle}}</p>
        </div>
        <div class="line-two">
          <p class="text">{{item.name}}</p>
          <p class="text">{{item.workMethod}}</p>
        </div>
        <div class="line-three">
          <p class="tag-item" v-for="(inItem, index) in item.brightPoints" :key="index">{{inItem}}</p>
        </div>
        <div class="line-four">
          <div class="left">
            <i class="iconfont liht-zuobiaofill"></i>
            <p>{{item.areaName}}</p>
          </div>
          <div class="right" @click="seeResult(item)">立即查看</div>
        </div>
      </div>
      <view class="no-data" v-if="(pageSize >= total || noMore)">
        <p>没有更多了</p>
      </view>
    </scroll-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: '1',
      searchKey: '',
      dataList: [],
      pageSize: 10,
      pageIndex: 1,
      total: 0,
      noMore: false,
      sort: '1',
      brightList: []
    }
  },
  onShow() {
    this.pageIndex = 1
    this.getBrightDict()
  },
  methods: {
    changeType(type) {
      this.type = type
    },
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
      }else {
        uni.reLaunch({
          url: '/pages/select/index'
        })
      }
    },
    // 获取列表数据
    fetchData() {
      if(uni.getStorageSync('loginType') === '1') {
        this.$api.getJobList({
          pageNum: this.pageIndex,
          pageSize: this.pageSize
        }).then(res => {
          this.dataList = res.rows
          this.total = res.total
          // 处理职位亮点
          this.dataList.map(item => {
            item.brightPoints = item.brightPoints.split(',')
            item.brightPoints.map((inItem, index) => {
              this.brightList.map(bItem => {
                if(inItem === bItem.dictValue) {
                  item.brightPoints[index] = bItem.dictLabel
                }
              })
            })
          })
        }).catch(err => {
          console.log(err)
        })
      }else if(uni.getStorageSync('loginType') === '2') {
        this.$api.getJobListTwo({
          pageNum: this.pageIndex,
          pageSize: this.pageSize
        }).then(res => {
          this.dataList = res.rows
          this.total = res.total
          // 处理职位亮点
          this.dataList.map(item => {
            item.brightPoints = item.brightPoints.split(',')
            item.brightPoints.map((inItem, index) => {
              this.brightList.map(bItem => {
                if(inItem === bItem.dictValue) {
                  item.brightPoints[index] = bItem.dictLabel
                }
              })
            })
          })
        }).catch(err => {
          console.log(err)
        })
      }
    },
    search() {
      this.pageIndex = 1
      this.fetchData()
    },
    changeSort() {
      this.sort = this.sort === '1' ? '2' : '1'
      this.pageIndex = 1
      this.fetchData()
    },
    seeResult(item) {
      uni.navigateTo({
        url:'/pages/jobDetail/index?id=' + item.id
      })
    },
    scrolltolower() {
      if(this.pageSize * this.pageIndex < this.total) {
        this.pageIndex++
        uni.showLoading()
        if(uni.getStorageSync('loginType') === '1') {
          this.$api.getJobList({
            pageNum: this.pageIndex,
            pageSize: this.pageSize
          }).then(res => {
            this.dataList = this.dataList.concat(res.rows)
          }).catch(err => {
            console.log(err)
          })
        }else if(uni.getStorageSync('loginType') === '2') {
          this.$api.getJobListTwo({
            pageNum: this.pageIndex,
            pageSize: this.pageSize
          }).then(res => {
            this.dataList = this.dataList.concat(res.rows)
          }).catch(err => {
            console.log(err)
          })
        }
      }else {
        this.noMore = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cjpf-page {
  position: relative;
  padding-top: 228rpx;
  box-sizing: border-box;
  .header-bar {
    position: absolute;
    top: 0;
    width: 100%;
    height: 228rpx;
    padding: 77rpx 0 0 38rpx;
    box-sizing: border-box;
    background: #38C1BA;
    .search {
      width: 504rpx;
      /deep/.uni-searchbar {
        padding: 0;
        .uni-searchbar__box {
          justify-content: flex-start;
          .uni-icons {
            color: #ffffff !important;
          }
          .uni-searchbar__text-placeholder {
            color: #ffffff !important;
          }
          .uni-searchbar__box-search-input {
            color: #ffffff !important;
          }
        }
      }
    }
    .change-panel {
      display: flex;
      margin-top: 20rpx;
      .change-text {
        margin-right: 30rpx;
        font-size: 32rpx;
        font-weight: bold;
        color: #b0e7e6;
      }
      .active {
        color: #ffffff;
      }
    }
  }
  .content-panel {
    height: calc(100vh - 228rpx);
    overflow: auto;
    .content-item {
      padding: 36rpx;
      margin: 16rpx auto;
      box-shadow: 0rpx 0rpx 40rpx rgba(0, 0, 0, 0.06);
      box-sizing: border-box;
      .line-one {
        width: 100%;
        display: flex;
        align-items: center;
        .left {
          width: 70%;
          font-size: 36rpx;
          font-weight: bold;
          color: #252525;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .right {
          width: 30%;
          color: #10AFA9;
          text-align: right;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .line-two {
        margin-top: 25rpx;
        display: flex;
        .text {
          margin-right: 53rpx;
          color: #717171;
        }
      }
      .line-three {
        width: 100%;
        margin-top: 36rpx;
        display: flex;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .tag-item {
          margin-right: 8rpx;
          padding: 0 16rpx;
          color: #717171;
          background: #95959522;
          line-height: 41rpx;
          font-size: 24rpx;
        }
      }
      .line-four {
        margin-top: 41rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          font-size: 24rpx;
          color: #717171;
          i {
            color: #10AFA9;
          }
        }
        .right {
          height: 32rpx;
          padding: 0 16rpx;
          line-height: 32rpx;
          border-radius: 13rpx;
          font-size: 24rpx;
          color: #ffffff;
          background: #10AFA9;
        }
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
}
</style>
