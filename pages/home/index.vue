<template>
  <div class="cjpf-page">
    <div class="header-bar">
      <picker class="picker" mode="date" fields="year" :value="selectYear" start="2021" end="2050" @change="dateChange">
        <span class="text">
          {{selectYear}}年
        </span>
        <image class="select-icon" src="../../static/img/select.svg" mode=""></image>
      </picker>
      <div class="right">
        <uni-search-bar v-model="searchKey" class="search" radius="100" placeholder="请输入" clearButton="none" cancelButton="none" @confirm="search" />
        <div class="spline"></div>
        <img src="../../static/img/icons_sort.svg" class="filter" @click="changeSort" v-if="sort === '1'">
        <img src="../../static/img/icons_sort_active.svg" class="filter" @click="changeSort" v-else>
      </div>
    </div>
    <scroll-view class="content-panel" scroll-y="true" @scrolltolower="scrolltolower">
      <div class="content-item" v-for="(item, index) in dataList" :key="index">
        <div class="line-one">
          <div class="address">
            <p>{{item.name}}</p>
          </div>
        </div>
        <div class="line-middle">
          <div class="item">
            <p class="title">工作地点</p>
            <p class="text">{{item.areaName}}</p>
          </div>
          <div class="item">
            <p class="title">预计薪资</p>
            <p class="text red">{{item.salary}}元/{{item.salaryStyle}}</p>
          </div>
        </div>
        <div class="bottom" @click="seeResult(item)">
          <p>立即查看</p>
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
      selectYear: '2022',
      searchKey: '',
      dataList: [],
      pageSize: 10,
      pageIndex: 1,
      total: 0,
      noMore: false,
      sort: '1'
    }
  },
  onShow() {
    this.pageIndex = 1
    this.fetchData()
  },
  methods: {
    fetchData() {
      if(uni.getStorageSync('loginType') === '1') {
        this.$api.getJobList({
          pageNum: this.pageIndex,
          pageSize: this.pageSize
        }).then(res => {
          this.dataList = res.rows
        }).catch(err => {
          console.log(err)
        })
      }else if(uni.getStorageSync('loginType') === '2') {
        this.$api.getJobListTwo({
          pageNum: this.pageIndex,
          pageSize: this.pageSize
        }).then(res => {
          this.dataList = res.rows
        }).catch(err => {
          console.log(err)
        })
      }else {
        uni.reLaunch({
          url: '/pages/select/index'
        })
      }
    },
    dateChange(e) {
      this.selectYear = e.detail.value
      this.pageIndex = 1
      this.fetchData()
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
  padding-top: 40rpx;
  box-sizing: border-box;
  .header-bar {
    position: absolute;
    top: 0;
    width: 100%;
    height: 80rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 2rpx solid rgb(243, 246, 243);
    .picker {
      display: flex;
      align-items: center;
      padding-left: 32rpx;
      line-height: 80rpx;
      font-size: 32rpx;
      position: relative;
      .select-icon {
        position: absolute;
        top: 26rpx;
        left: 150rpx;
        width: 32rpx;
        height: 32rpx;
      }
    }
    .right {
      padding-right: 32rpx;
      display: flex;
      align-items: center;
      .search {
        width: 350rpx;
      }
      .spline {
        width: 2rpx;
        height: 32rpx;
        margin: 0 32rpx;
        background: rgb(230, 234, 234);
      }
      .filter {
        width: 48rpx;
        height: 48rpx;
      }
    }
  }
  .content-panel {
    height: calc(100vh - 80rpx);
    overflow: auto;
    padding-top: 32rpx;
    .content-item {
      width: 686rpx;
      height: 280rpx;
      margin: 32rpx auto;
      border-radius: 8rpx;
      box-shadow: 0rpx 0rpx 40rpx rgba(0, 0, 0, 0.06);
      .line-one {
        height: 64rpx;
        padding: 0 32rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 24rpx;
        .address {
          display: flex;
          line-height: 36rpx;
          color: rgb(107, 116, 115);
          .address-icon {
            width: 36rpx;
            height: 36rpx;
            margin-right: 4rpx;
          }
        }
        .see-result {
          color: rgb(21, 151, 246);
        }
      }
      .line-middle {
        height: 94rpx;
        padding: 0 32rpx;
        display: flex;
        justify-content: space-between;
        .item {
          .title {
            font-size: 24rpx;
            line-height: 36rpx;
            color: rgb(169, 183, 181);
          }
          .text {
            font-size: 36rpx;
            line-height: 52rpx;
            color: rgb(66, 66, 66);
            font-weight: bold;
          }
          .red {
            color: rgb(247, 112, 112);
          }
        }
      }
      .bottom {
        width: 622rpx;
        height: 60rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20rpx auto 0 auto;
        border-radius: 20rpx;
        font-size: 32rpx;
        color: rgb(11, 176, 127);
        border: 2rpx solid rgba(11, 176, 127, 1);
        background: rgba(11, 176, 127, 0.3);
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
