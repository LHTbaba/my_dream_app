<template>
  <div class="complete-info-page">
    <div class="input-panel">
      <div class="input-item">
        <div class="title">姓名</div>
        <input v-model="name" type="text" placeholder="请输入姓名" style="text-align:right" placeholder-style='text-align:right;' />
      </div>
      <div class="input-item">
        <div class="title">手机号</div>
        <input v-model="phone" type="text" placeholder="请输入手机号" style="text-align:right" placeholder-style='text-align:right;' />
      </div>
      <div class="input-item">
        <div class="title">身份证</div>
        <input v-model="idCard" type="text" placeholder="请输入身份证" style="text-align:right" placeholder-style='text-align:right;' />
      </div>
      <div class="input-item">
        <div class="title">紧急联系人</div>
        <input v-model="urgentPerson" type="text" placeholder="请输入紧急联系人" style="text-align:right" placeholder-style='text-align:right;' />
      </div>
      <div class="input-item">
        <div class="title">紧急联系人电话</div>
        <input v-model="urgentPhone" type="text" placeholder="请输入紧急联系人电话" style="text-align:right" placeholder-style='text-align:right;' />
      </div>
      <div class="input-item">
        <div class="title">开户银行</div>
        <input v-model="bank" type="text" placeholder="请输入开户银行" style="text-align:right" placeholder-style='text-align:right;' />
      </div>
      <div class="input-item">
        <div class="title">银行卡号</div>
        <input v-model="bankAccount" type="text" placeholder="请输入银行卡号" style="text-align:right" placeholder-style='text-align:right;' />
      </div>
    </div>
    <div class="button-panel">
      <button type="default">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      phone: '',
      idCard: '',
      urgentPerson: '',
      urgentPhone: '',
      bank: '',
      bankAccount: ''
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
