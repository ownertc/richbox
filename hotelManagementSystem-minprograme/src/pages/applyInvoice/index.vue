<template>
<div class="wrap">
      <ul class="orderLists" v-if="orderStatus">
          <li class="item">
              <div class="left">
                 <checkbox style="width:30rpx;height:30rpx" color="#ec5045"></checkbox>
              </div>
              <div class="middle">
                  <p class="title">上海隆德丰大酒店</p>
                  <p style="border-bottom:2rpx solid #eee">入住时间：2018-09-18  离店时间：2018-09-23</p>
                  <p class="order"><span>订单编号：20183883474774</span><span class="price">￥580</span></p>
              </div>  
          </li>
           <li class="item">
              <div class="left">
                 <checkbox style="width:30rpx;height:30rpx;" color="#ec5045"></checkbox>
              </div>
              <div class="middle">
                  <p class="title">上海隆德丰大酒店</p>
                  <p style="border-bottom:2rpx solid #eee">入住时间：2018-09-18  离店时间：2018-09-23</p>
                  <p class="order"><span>订单编号：20183883474774</span><span class="price">￥580</span></p>
              </div>  
          </li>
      </ul>
     <div class="btn" v-if="orderStatus" @click="orderStatus=!orderStatus">下一步</div>
     <form v-if="!orderStatus" class="form">
        <view class="section">
            <view class="section__title">发票类型</view>
             <picker  :value="index" :range="array"  class="input" @change="taxTypeChange">
                <view class="picker">
                  {{array[index]}}
                </view>
              </picker>
        </view>
         <view class="section">
            <view class="section__title">发票抬头</view>
            <picker  :value="indexType" :range="arrayType"  class="input" @change="taxTypeChange" v-if="arrayType.length">
                <view class="picker">
                  {{arrayType[index]}}
                </view>
              </picker>
               <a class="input" v-if="!arrayType.length" href="../../pages/addInvoiceHeader/main">
                  请添加发票抬头
                </a>
              <i class="fa fa-plus"  style="font-size:30rpx;color:#999;padding:0 40rpx"></i>
        </view>
        <view class="taxDetail" v-if="index==0">
            <p><span>纳税人识别号：</span><span>36646545755885</span></p>
            <p><span>公司地址：</span><span>上海闵行区申行区123路</span></p>
           <p><span>公司电话：</span><span>021-848677676</span></p>
           <p><span>开户银行：</span><span>建设银行</span></p>
           <p><span>开户银行账号：</span><span>23598568677776774</span></p>
        </view>
         <view class="invoiceDetail">
            <p><span>发票明细：</span><span>代理酒店服务费</span></p>
            <p><span>发票金额：</span><span>￥580</span></p>
           <p>
               <span>邮寄地址：</span>
               <picker  :value="mailIndex" :range="arrayMail"   @change="taxTypeChange" v-if="arrayMail.length" style="display:inline">
                <view class="picker" style="display:inline">
                  {{arrayMail[mailIndex]}}
                </view>
              </picker>
               <a class="input" v-if="!arrayMail.length" style="display:inline" href="../../pages/addMailAddress/main">
                  请添加邮寄地址
                </a>
              <i class="fa fa-plus"  style="font-size:30rpx;color:#999;padding:0 40rpx"></i>
           </p>
       
        </view>
         <view class="mailDetail">
            <p><span>收件人：</span><span>李明</span></p>
            <p><span>邮政编号：</span><span>284868586</span></p>
        </view>
         <div class="btn" v-if="!orderStatus" >提交</div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderStatus: true,
      array: ['企业', '个人'],
      invoiceHeader: {},
      arrayType: [],
      arrayMail: [],
      index: 0,
      indexType: 0,
      mailIndex: 0
    }
  },
  methods: {
    taxTypeChange (e) {
      this.index = e.target.value
    }
  },
  onShow () {
    if (wx.getStorageInfoSync('invoiceHeader')) {
      this.invoiceHeader = JSON.parse(wx.getStorageInfoSync('invoiceHeader'))
    }
  }
}
</script>

<style scoped>
.wrap {
  box-sizing: border-box;
 
}
.orderLists{
    width: 100vw;
     min-height: 100vh;
    background: #eeeeee;
     padding: 20rpx 0 60rpx 0;
}
.left {
  padding-top: 30rpx;
  margin-right: 20rpx;
}
.item {
  width: 90vw;
  margin: 20rpx auto;
  background: #fff;
  border-radius: 10rpx;
  display: flex;
  padding: 20rpx;
  justify-content: space-between;
}
.middle .title {
  font-size: 30rpx;
  color: #000;
  font-weight: 500;
  line-height: 2.5;
}
.middle {
  font-size: 28rpx;
  color: #333;
}
.order {
  line-height: 2.5;
  display: flex;
  justify-content: space-between;
}
.price {
  font-size: 32rpx;
  color: #666;
  font-weight: 600;
}

.btn {
  position: fixed;
  bottom: 40rpx;
  z-index: 999;
  width: 90vw;
  left: 5vw;
  height: 80rpx;
  text-align: center;
  border-radius: 80rpx;
  line-height: 80rpx;
  color: #fff;
  background: #ec5045;
  font-size: 30rpx;
}
.form{
    display: block;
    width: 100vw;
    min-height: 100vh;
    background: #FFF;
    margin: 0;
}
.section{
    display: flex;
    justify-content: space-between;
    margin: 20rpx 40rpx;
    border-bottom: 2rpx solid #eee;
}
.section__title{
    font-size: 28rpx;
    color:#666;
    width:20%;
    height: 60rpx;
    line-height:50rpx;
}
.input{
    flex:1;
    font-size: 28rpx;
    color:#666;
     height: 40rpx;
}
.taxDetail,.invoiceDetail,.mailDetail{
    font-size: 28rpx;
    color:#999;
    border-bottom: 2rpx solid #eee;
    margin: 20rpx 40rpx;
    line-height: 60rpx;
}
.invoiceDetail{
    color:#333;
}
</style>
