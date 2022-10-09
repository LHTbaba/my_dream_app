<template>
  <div class="complete-info-page">
    <div class="input-panel">
      <div class="input-item">
        <div class="title">姓名<span class="red">*</span></div>
        <input v-model="name" type="text" placeholder="请输入姓名" style="text-align:right" placeholder-style='text-align:right;' />
      </div>
      <div class="input-item">
        <div class="title">性别<span class="red">*</span></div>
        <radio-group @change="changeSex">
          <label v-for="item in sexRadio" :key="item">
            <radio :value="item" :checked="item == sex" />{{item}}
          </label>
        </radio-group>
      </div>
      <div class="input-item">
        <div class="title">手机号<span class="red">*</span></div>
        <input v-model="phone" type="text" placeholder="请输入手机号" style="text-align:right" placeholder-style='text-align:right;' />
        <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" withCredentials="true">
          获取
        </button>
      </div>
      <div class="input-item">
        <div class="title">身份证<span class="red">*</span></div>
        <input v-model="idCard" type="text" placeholder="请输入身份证" style="text-align:right" placeholder-style='text-align:right;' />
      </div>
      <div class="input-item">
        <div class="title">紧急联系人<span class="red">*</span></div>
        <input v-model="urgentPerson" type="text" placeholder="请输入紧急联系人" style="text-align:right" placeholder-style='text-align:right;' />
      </div>
      <div class="input-item">
        <div class="title">紧急联系人电话<span class="red">*</span></div>
        <input v-model="urgentPhone" type="text" placeholder="请输入紧急联系人电话" style="text-align:right" placeholder-style='text-align:right;' />
      </div>
      <!-- <div class="input-item">
        <div class="title">开户银行<span class="red">*</span></div>
        <uni-data-select v-model="bank" :localdata="bankList" @change="bankChange" :clear="false"></uni-data-select>
      </div>
      <div class="input-item">
        <div class="title">银行卡号<span class="red">*</span></div>
        <input v-model="bankAccount" type="text" placeholder="请输入银行卡号" style="text-align:right" placeholder-style='text-align:right;' />
      </div> -->
      <div class="input-item">
        <div class="title">学校名称<span class="red">*</span></div>
        <input v-model="universityName" type="text" placeholder="请输入学校名称" style="text-align:right" placeholder-style='text-align:right;' />
      </div>
      <div class="input-item">
        <div class="title">学校地址<span class="red">*</span></div>
        <input v-model="universityLocation" type="text" placeholder="请输入学校地址" style="text-align:right" placeholder-style='text-align:right;' />
        <img src="../../static/img/location.png" class="location" @click="getLocation">
      </div>
    </div>
    <div class="button-panel">
      <button type="default" @click="submitForm">提交</button>
    </div>
  </div>
</template>

<script>
import config from "../../http/config.js";
export default {
  data() {
    return {
      name: '',
      sex: '',
      phone: '',
      idCard: '',
      urgentPerson: '',
      urgentPhone: '',
      // bank: '',
      // bankAccount: '',
      universityName: '',
      universityLocation: '',
      sexRadio: ['男', '女'],
      bankList: []
    }
  },
  onLaunch(options) {
    if(!uni.getStorageSync('isLogin')) {
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
            success: res => {
              uni.setStorageSync('sessionKey', res.data.data.sessionKey)
              this.$store.commit('login')
              uni.showToast({
                title: options.query.scene,
                icon:'none'
              })
              this.$api.fetchAgencyInfo({
                id: options.query.scene
              }).then(resp => {
                uni.showModal({
                  title: '请确认代理信息',
                  content: `代理姓名：${resp.data.nickName}；代理电话：${resp.data.phonenumber}`,
                  confirmText: "确认", // 确认按钮的文字  
                  showCancel: false, // 是否显示取消按钮，默认为 true
                  success: (reso) => {
                  if(reso.confirm) {  
                    console.log('comfirm') //点击确定之后执行的代码
                  } else {  
                    console.log('cancel') //点击取消之后执行的代码
                    }  
                  } 
                })
              }).catch(err => {
                console.log(err)
              })
            }
          })
        },
        fail: err => {
          console.log('登录失败：', err)
        }
      })
    }
  },
  mounted() {
    this.getDict()
    if(!uni.getStorageSync('isLogin')) {
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
            success: res => {
              uni.setStorageSync('sessionKey', res.data.data.sessionKey)
              this.$store.commit('login')
            }
          })
        },
        fail: err => {
          console.log('登录失败：', err)
        }
      })
    }
  },
  methods: {
    // bankChange() {

    // },
    // 获取开户银行
    getDict() {
      this.$api.getDict({
        dictType: 'sys_bank_name'
      }).then(res => {
        this.bankList = res.rows
        this.$api.fetchInfo().then(res => {
          if(res.code === 200) {
            this.name = res.wxUserAdd.name
            this.sex = res.wxUserAdd.sex === '1' ? '男' : '女'
            this.phone = res.wxUserAdd.phone
            this.idCard = res.wxUserAdd.idCard
            this.urgentPerson = res.wxUserAdd.urgentPerson
            this.urgentPhone = res.wxUserAdd.urgentPhone
            this.universityName = res.wxUserAdd.universityName
            this.universityLocation = res.wxUserAdd.universityLocation
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    getLocation() {
      uni.chooseLocation({
        success: (res) => {
          this.universityLocation = res.address
        }
      })
    },
		getPhoneNumber(e) {
			console.log(e.detail)
			//e.detail这里会有三个属性
			//encryptedData
			//errMsg
			//iv
      this.$api.getPhoneNumber({
        code: e.detail.code
      }).then(res => {
        this.phone = res.data.phoneNumber
      }).catch(err => {
        console.log(err)
      })
		},
    changeSex(e) {
      this.sex = e.detail.value
    },
    submitForm() {
      this.$api.completeInfo({
        name: this.name,
        sex: this.sex === '男' ? '1' : '2',
        phone: this.phone,
        idCard: this.idCard,
        urgentPerson: this.urgentPerson,
        urgentPhone: this.urgentPhone,
        // bank: this.bank,
        // bankAccount: this.bankAccount,
        universityName: this.universityName,
        universityLocation: this.universityLocation,
      }).then(res => {
        if(res.code === 200) {
          uni.showToast({
            icon: 'none',
            title: '提交成功！'
          })
          uni.navigateBack()
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.complete-info-page {
  .input-panel  {
    padding: 0 48rpx;
    border-top:  2rpx solid #eeeeee;
    .input-item {
      height: 96rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2rpx solid #eeeeee;
      .title {
        .red {
          color: red;
        }
      }
      button {
        height: 52rpx;
        margin: 0;
        line-height: 52rpx;
        font-size: 28rpx;
        background: #10AFA9;
        color: #ffffff;
      }
      .location {
        width: 48rpx;
        height: 48rpx;
      }
    }
  }
  .button-panel {
    padding: 48rpx;
    button {
      color: #ffffff;
      background: #38C1BA;
    }
  }
}
</style>
