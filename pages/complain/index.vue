<template>
  <view class="complain-panel">
    <img src="../../static/BANNER.png" class="top-pic">
    <view class="form-panel">
      <view class="input-item border" v-if="!(type == 'detail' && !detail.COMPANY_NAME)">
        <p class="input-title">企业名称<span class="red">*</span></p>
        <view class="select-panel" v-if="type !== 'detail'">
          <input v-model="form.compName" maxlength="20" type="text" placeholder="请输入企业全称" />
        </view>
        <view v-else>{{detail.COMPANY_NAME}}</view>
      </view>
      <view class="input-item border" v-if="!(type == 'detail' && !detail.LINK_NAME)">
        <p class="input-title">联系人<span class="red">*</span></p>
        <view class="select-panel" v-if="type !== 'detail'">
          <input v-model="form.name" maxlength="20" type="text" placeholder="请输入姓名" />
        </view>
        <view v-else>{{detail.LINK_NAME}}</view>
      </view>
      <view class="input-item border" v-if="!(type == 'detail' && !detail.TEL)">
        <p class="input-title">电话号码<span class="red">*</span></p>
        <view class="select-panel" v-if="type !== 'detail'">
          <input v-model="form.number" type="text" placeholder="请输入电话号码" @input='inputNumber' />
        </view>
        <view v-else>{{detail.TEL}}</view>
      </view>
      <view class="input-item border" v-if="!(type == 'detail' && !detail.TYPE1)">
        <p class="input-title">类别一<span class="red">*</span></p>
        <view class="select-panel" v-if="type !== 'detail'">
          <hpy-form-select v-model="form.typeOne" :dataList="typeList.LIST1" text="TEXT" name="VALUE" title="请选择类别一" hideBorder/>
        </view>
        <view v-else>{{detail.TYPE1}}</view>
      </view>
      <view class="input-item border" v-if="!(type == 'detail' && !detail.TYPE2)">
        <p class="input-title">类别二<span class="red">*</span></p>
        <view class="select-panel" v-if="type !== 'detail'">
          <hpy-form-select v-model="form.typeTwo" :dataList="typeList.LIST2" text="TEXT" name="VALUE" title="请选择类别二" hideBorder/>
        </view>
        <view v-else>{{detail.TYPE2}}</view>
      </view>
      <view class="input-item">
        <p class="input-title">诉求内容<span class="red">*</span></p>
      </view>
      <view class="text-area" v-if="type !== 'detail'">
        <textarea v-model="form.content" maxlength="200" placeholder="请输入诉求内容" />
      </view>
      <view class="text-area" v-else>
        <textarea v-model="detail.CONTENT" maxlength="200" disabled />
      </view>
      <view class="input-item" v-if="type !== 'detail'">附件上传</view>
      <view class="input-item" v-else-if="imgListShow.length > 0">诉求附件</view>
      <view class="border">
        <img :src="item.url" v-for="(item, index) in imgListShow" :key="index" @click="viewImageShow(index)" class="show-img">
      </view>
      <view class="upload_box" v-if="type !== 'detail'"> 
        <view class="upload_item"  v-for="(item,index) in imgList" :key='index'>
          <block>
            <image :src="item.url" @click="viewImage" mode="" class="uploadImg" :data-src="item.url"></image>
            <view class="delBtn" @click="delImg">
              <text>x</text>
            </view>
          </block>  
        </view>
        <view class="upload_btn" @click="chooseImage" v-if="imgList.length<9" >
          <img src="../../static/plus.png">
        </view>
      </view>
      <view class="input-item" v-if="detail.REPLY_CONTENT">
        <p class="input-title">回复内容<span class="red">*</span></p>
      </view>
      <view class="text-area" v-if="detail.REPLY_CONTENT">
        <textarea v-model="detail.REPLY_CONTENT" maxlength="200" disabled />
      </view>
      <view class="input-item" v-if="hfList.length > 0">回复附件</view>
      <view class="input-item border" v-for="(item, index) in hfList" :key="index" @click="downLoad(item.url)">
        <p class="file-name">{{item.name}}</p>
        <p class="arrow">></p>
      </view>
      <view class="input-item border" v-if="type === 'detail'">
        <p class="input-title">办理状态</p>
        <view class="select-panel" v-if="detail.DJ_STATE === '002'">办理中</view>
        <view class="select-panel" v-if="detail.DJ_STATE === '003'">已办理</view>
        <view class="select-panel" v-if="detail.DJ_STATE === '004'">已办结</view>
      </view>
      <template v-if="detail.DJ_STATE === '004'">
        <view class="input-item border" v-if="pjList.length === 0">
          <p class="input-title">评价星级<span class="red">*</span></p>
          <view class="select-panel">
            <uni-rate v-model="rate"/>
          </view>
        </view>
        <view class="input-item border" v-else>
          <p class="input-title">评价星级<span class="red">*</span></p>
          <view class="select-panel">
            <uni-rate v-model="pjList.STARS" readonly/>
          </view>
        </view>
        <view class="input-item border">
          <p class="input-title">评价内容<span class="red">*</span></p>
        </view>
        <view class="text-area" v-if="pjList.length === 0">
          <textarea v-model="pjContent" maxlength="200" placeholder="请输入评价内容" />
        </view>
        <view class="text-area" v-else>
          <textarea v-model="pjList.CONTENT" maxlength="200" disabled />
        </view>
      </template>
    </view>
		<view class="submit-panel" v-if="type !== 'detail'">
			<button @click="submitForm">提交</button>
		</view>
		<view class="submit-panel" v-if="pjList.length === 0 && detail.DJ_STATE === '004'">
			<button @click="pjForm">评价</button>
		</view>
  </view>
</template>

<script>
import config from '../../http/config.js'
export default {
  data() {
    return {
			rate: 0,
      pjContent: '',
      type: '',
      typeList: [],
      form: {
        typeOne: '',
        typeTwo: '',
        areaValue: '20220302092915766566100001294101',
        compName: '',
        name: '',
        number: '',
        content: ''
      },
      imgList: [],
      filePathList: [],
      fileNameList: [],
      detail: {},
      imgListShow: [],
      pjList: [],
      hfList: []
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
    //获取type下拉框内容
    if(this.type !== 'detail') {
      this.$api.getData({
        'cmd.sqlKey': 'MSP_WX_LZY.SEL_LB',
        'cmd.sqlType': 'proc'
      }).then(res => {
        this.typeList = res[0]
      })
    }else {
      //获取诉求详情
      this.$api.getData({
        'cmd.sqlKey': 'MSP_WX_LZY.MSP_SQ_SINGLE',
        'cmd.sqlType': 'proc',
        'cmd.QID': option.id
      }).then(res => {
        this.detail = res[0].LIST[0]
        res[0].FJLIST.map(item => {
          if(item.FLAG === 'sq') {
            this.imgListShow.push({
              name: item.DESC_INFO,
              url: this.$baseUrl.baseUrl + '/' + item.FILEPATH
            })
          }else if(item.FLAG === 'hf') {
            this.hfList.push({
              name: item.DESC_INFO,
              url: this.$baseUrl.baseUrl + '/' + item.FILEPATH
            })
          }
        })
        this.pjList = res[0].PJLIST[0]
      })
    }
  },
  methods: {
		downLoad(url) {
			uni.downloadFile({
				url: url,
				success: (res) => {
					if (res.statusCode === 200) {
						// 打开文件
						var filePath = res.tempFilePath
						uni.openDocument({
							filePath: filePath,
							showMenu: true,
							success: (res) => {
								uni.showToast({
									icon:"none",
									title:'打开文件成功！'
								})
							},
						})
					}
				}
			})
		},
    // 电话号码校验
    inputNumber(e) {
      const o = e.detail.value
      const inputRule = /[^\d]/g
      this.$nextTick(() => {
        this.form.number = o.replace(inputRule, '')
      })
    },
    chooseImage(){
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['camera', 'album'], //从相册选择
        success: (res) => {
          this.imgList.push({
            url: res.tempFilePaths[0]
          })
          uni.uploadFile({
            url: config.baseUrl + '/vxUpload',
            header:{
              "Content-Type": "multipart/form-data",
              "accept": 'application/json'
            },
            filePath: res.tempFilePaths[0], // uni.chooseImage函数调用后获取的本地文件路径
            name: 'file',
            success: (res) => {
              let data = JSON.parse(res.data)
              this.filePathList.push(data.filePath)
              this.fileNameList.push(data.fileName)
            }
          })
        }
      })
    },
    viewImage(e) {
      var imgLists = this.imgList.map( item =>{
        //只返回图片路径
        return item.url  
      })
      uni.previewImage({
        urls: imgLists,
        current: e.currentTarget.dataset.index
      })
    },
    viewImageShow(index) {
      var imgLists = this.imgListShow.map( item =>{
        //只返回图片路径
        return item.url
      })
      uni.previewImage({
        urls: imgLists,
        current: index
      })
    },
    delImg(e) {
      uni.showModal({
        title: '提示',
        content: '确定删除该照片吗？',
        cancelText: '取消',
        confirmText: '确定',
        success: res => {
          if (res.confirm) {
            this.imgList.splice(e.currentTarget.dataset.index, 1)
            this.filePathList.splice(e.currentTarget.dataset.index, 1)
            this.fileNameList.splice(e.currentTarget.dataset.index, 1)
          }
        }
      })
    },
    pjForm() {
      if(this.rate === 0) {
        uni.showToast({
          icon:"none",
          title:'请选择星级！'
        })
        return
      }
      if(this.pjContent === '') {
        uni.showToast({
          icon:"none",
          title:'请填写评论内容！'
        })
        return
      }
      // 提交评价内容
      this.$api.getData({
        'cmd.sqlKey': 'MSP_WX_LZY.MSP_SQ_EVALUATE',
        'cmd.sqlType': 'proc',
        'cmd.QSQID': this.detail.ID,
        'cmd.QSTARS': this.rate,
        'cmd.QCONTENT': this.pjContent
      }).then(res => {
        uni.redirectTo({
					url: "/pages/complainList/index"
				})
      })
    },
    submitForm() {
      if(this.form.areaValue === '') {
        uni.showToast({
          icon:"none",
          title:'请选择区县！'
        })
        return
      }
      if(this.form.compName === '') {
        uni.showToast({
          icon:"none",
          title:'请填写企业名称！'
        })
        return
      }
      let noBlank = /\s+/g
      if(this.form.compName) {
        if(noBlank.test(this.form.compName)) {
          uni.showToast({
            icon:"none",
            title:'企业名称不能输入空格！'
          })
          return
        }
      }
      if(this.form.name === '') {
        uni.showToast({
          icon:"none",
          title:'请填写联系人！'
        })
        return
      }
      if(this.form.name) {
        if(noBlank.test(this.form.name)) {
          uni.showToast({
            icon:"none",
            title:'联系人不能输入空格！'
          })
          return
        }
      }
      if(this.form.number === '') {
        uni.showToast({
          icon:"none",
          title:'请填写电话号码！'
        })
        return
      }
      let reg = /^((0\d{2,3}\d{7,8})|(1[3456789]\d{9}))$/
      if(this.form.number) {
        if(!reg.test(this.form.number)) {
          uni.showToast({
            icon:"none",
            title:'电话号码格式不正确！'
          })
          return
        }
      }
      if(this.form.typeOne === '') {
        uni.showToast({
          icon:"none",
          title:'请选择类别一！'
        })
        return
      }
      if(this.form.typeTwo === '') {
        uni.showToast({
          icon:"none",
          title:'请选择类别二！'
        })
        return
      }
      if(this.form.content === '') {
        uni.showToast({
          icon:"none",
          title:'请填写诉求内容！'
        })
        return
      }
      if(this.form.content) {
        if(noBlank.test(this.form.content)) {
          uni.showToast({
            icon:"none",
            title:'诉求内容不能输入空格！'
          })
          return
        }
      }
      let formData = {
        'cmd.sqlKey': 'MSP_WX_LZY.MSP_SQ_ADD',
        'cmd.sqlType': 'proc',
        'cmd.QID': '',	//诉求ID（新增为空）
        'cmd.IOPENID': this.$store.state.openid,	//openid
        'cmd.IWX_NAME': this.$store.state.nickName,	//微信名
        'cmd.IWX_SEX': this.$store.state.gender,	//微信性别
        'cmd.IWX_CITY': this.$store.state.city,	//微信城市
        'cmd.IWX_SF': this.$store.state.province,	//微信省份
        'cmd.IREGION_ID': this.form.areaValue,  //区县id
        'cmd.ICOMPANYNAME': this.form.compName, //企业名称
        'cmd.INAME': this.form.name, //联系人姓名
        'cmd.ITEL': this.form.number, //电话号码
        'cmd.QTYPE1': this.form.typeOne, //类别一
        'cmd.QTYPE2': this.form.typeTwo, //类别二
        'cmd.ICONTENT': this.form.content, //诉求内容
        'cmd.IXGFJPATH': this.filePathList.join(','), //附件路径
        'cmd.IXGFJNAME': this.fileNameList.join(',') //附件名
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
