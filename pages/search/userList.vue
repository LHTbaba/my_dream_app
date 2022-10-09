<template>
  <div class="user-list-page">
    <scroll-view class="content-panel" scroll-y="true" @scrolltolower="scrolltolower">
      <div class="content-item" v-for="(item, index) in dataList" :key="index" @click="seeResult(item.ptjobSpuId)">
        <div class="line-one">
          <p class="left">{{item.ptjobSpu.companyName}}</p>
          <p class="right">{{item.ptjobSpu.salary}}元/{{item.ptjobSpu.salaryStyle}}</p>
        </div>
        <div class="line-two">
          <p class="text">{{item.ptjobSpu.name}}</p>
          <p class="text">{{item.ptjobSpu.workMethod}}</p>
        </div>
        <div class="line-three">
          <p class="tag-item" v-for="(inItem, index) in item.ptjobSpu.brightPoints" :key="index">{{inItem}}</p>
        </div>
        <div class="line-four">
          <div class="left">
            <i class="iconfont liht-zuobiaofill"></i>
            <p>{{item.ptjobSpu.areaName}}</p>
          </div>
          <div class="right">立即查看</div>
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
      type: '01',
      dataList: [],
      pageSize: 10,
      pageIndex: 1,
      total: 0,
      noMore: false,
      sort: '1',
      brightList: []
    }
  },
  onLoad(params) {
    this.type = params.type
    if(this.type === '01') {
      uni.setNavigationBarTitle({
        title: "已报名"
      })
    }else {
      uni.setNavigationBarTitle({
        title: "已录用"
      })
    }
  },
  onShow() {
    this.pageIndex = 1
    this.getDict()
  },
  methods: {
    // 获取职位亮点字典
    getDict() {
      this.$api.getDict({
        dictType: 'sys_ptjob_point'
      }).then(res => {
        this.brightList = res.rows
        this.fetchData()
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取列表数据
    fetchData() {
      uni.showLoading()
      this.$api.searchJobList({
        type: this.type,
        pageNum: this.pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        uni.hideLoading()
        this.dataList = res.rows
        this.total = res.total
        // 处理职位亮点
        this.dataList.map(item => {
          item.ptjobSpu.brightPoints = item.ptjobSpu.brightPoints.split(',')
          item.ptjobSpu.brightPoints.map((inItem, index) => {
            this.brightList.map(bItem => {
              if(inItem === bItem.dictValue) {
                item.ptjobSpu.brightPoints[index] = bItem.dictLabel
              }
            })
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    seeResult(id) {
      uni.navigateTo({
        url:'/pages/jobDetail/index?id=' + id
      })
    },
    scrolltolower() {
      if(this.pageSize * this.pageIndex < this.total) {
        this.pageIndex++
        uni.showLoading()
        this.$api.searchJobList({
          type: this.type,
          pageNum: this.pageIndex,
          pageSize: this.pageSize
        }).then(res => {
          uni.hideLoading()
          // 处理职位亮点
          res.rows.map(item => {
            item.ptjobSpu.brightPoints = item.ptjobSpu.brightPoints.split(',')
            item.ptjobSpu.brightPoints.map((inItem, index) => {
              this.brightList.map(bItem => {
                if(inItem === bItem.dictValue) {
                  item.ptjobSpu.brightPoints[index] = bItem.dictLabel
                }
              })
            })
          })
          this.dataList = this.dataList.concat(res.rows)
        }).catch(err => {
          console.log(err)
        })
      }else {
        this.noMore = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-list-page {
  box-sizing: border-box;
  .content-panel {
    height: 100vh;
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
          height: 40rpx;
          padding: 0 16rpx;
          line-height: 40rpx;
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
