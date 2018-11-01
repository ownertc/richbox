<template>
<div class="wrap">
    
      <ul class="orderLists" v-if="orderStatus" style="margin-bottom:100rpx">
        <p style="text-align:center;font-size:30rpx;color:#999;margin-top:100rpx" v-if="!noInvoicingOrderList.length">没有可开票的订单！</p>
        <checkbox-group @change="checkboxChange" v-if="noInvoicingOrderList.length">
          <li class="item" v-for="(item,index) in noInvoicingOrderList" :key="index">
              <div class="left" style="margin-right:60rpx">
                 <checkbox style="width:30rpx;height:30rpx" color="#ec5045" :value="index"></checkbox>
              </div>
              <div class="middle">
                  <p class="title">{{item.HotelName}}</p>
                  <p style="border-bottom:2rpx solid #eee">入住时间：{{item.CheckinTime}}  离店时间：{{item.CheckoutTime}}</p>
                  <p class="order"><span>订单编号：{{item.OrderNum}}</span><span class="price">￥{{item.ActPrice}}</span></p>
              </div>  
          </li>
        </checkbox-group>
      </ul>
    
      <div class="footer" v-if="noInvoicingOrderList.length">
         <div class="btn" v-if="orderStatus&&orderlist.length" @click="nextStep()">下一步</div>
          <div class="btn" v-if="orderStatus&&!orderlist.length" style="background:#ccc" >下一步</div>
     </div>
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
            <picker  :value="indexType" :range="arrayType"  class="input" @change="invoicetypeChange" v-if="arrayType.length">
                <view class="picker">
                  {{arrayType[indexType]}}
                </view>
              </picker>
               <a class="input" v-if="!arrayType.length" href="../../pages/addInvoiceHeader/main">
                  请添加发票抬头
                </a>
                <a style="display:inline" href="../../pages/addInvoiceHeader/main"><i class="fa fa-plus"  style="font-size:30rpx;color:#999;padding:0 40rpx"></i></a>
        </view>
        <view class="taxDetail" v-if="index==0">
            <p><span>纳税人识别号：</span><span>{{invoiceHeaderList[indexType].IdentifyNumber}}</span></p>
            <p><span>公司地址：</span><span>{{invoiceHeaderList[indexType].CompanyAddress}}</span></p>
           <p><span>公司电话：</span><span>{{invoiceHeaderList[indexType].CompanyPhone}}</span></p>
           <p><span>开户银行：</span><span>{{invoiceHeaderList[indexType].BankName}}</span></p>
           <p><span>开户银行账号：</span><span>{{invoiceHeaderList[indexType].BankAccount}}</span></p>
        </view>
         <view class="invoiceDetail" >
            <p style="display:flex"><span>发票明细：</span><span>代订酒店服务费</span></p>
            <p><span>发票金额：</span><span>￥{{totalPrice}}</span></p>
           <p style="display:flex"> 
               <span>邮寄地址：</span>
               <picker  :value="mailIndex" :range="arrayMail"   @change="mailTypeChange" v-if="arrayMail.length" style="display:inline">
                <view class="picker" style="display:inline-block;width:400rpx;overflow:hidden; text-overflow: ellipsis;text;white-space: nowrap; ">
                  {{arrayMail[mailIndex]}}
                </view>
              </picker>
               <a class="input" v-if="!arrayMail.length" style="display:inline" href="../../pages/addMailAddress/main">
                  请添加邮寄地址
                </a>
              <a style="display:inline" href="../../pages/addMailAddress/main"><i class="fa fa-plus"  style="font-size:30rpx;color:#999;padding:0 40rpx"></i></a>
           </p>
       
        </view>
         <view class="mailDetail">
            <p><span>收件人：</span><span>{{mailAddressList[mailIndex].ReceiverName}}</span></p>
            <p><span>邮政编号：</span><span>{{mailAddressList[mailIndex].PostalCode}}</span></p>
        </view>
         <div class="btn" v-if="!orderStatus"  @click="addInvoice">提交</div>
    </form>
  </div>
</template>

<script>
import {noInvoicingOrder, invoiceHeaderCheck, mailAddressCheck, invoiceAdd} from '@/utils/api'

export default {
  data () {
    return {
      orderStatus: true,
      array: ['企业', '个人'],
      InvoiceContent: '',
      invoiceType: ['ITAAQY0001', 'ITAAGR0001'],
      queryParamsInvoiceHeader: {
        invoiceType: 'ITAAQY0001'
      },
      apply: 1,
      noInvoicingOrderList: [],
      invoiceHeaderList: [],
      mailAddressList: [],
      totalPrice: 0,
      maxPage: 1,
      queryParams: {
        pageIndex: 1,
        pageSize: 10
      },
      invoiceHeader: {},
      orderlist: [],
      arrayType: [],
      arrayMail: [],
      index: 0,
      indexType: 0,
      mailIndex: 0
    }
  },
  methods: {
    nextStep () {
      this.orderStatus = !this.orderStatus
      this.apply = 2
    },
    invoicetypeChange (e) {
      this.indexType = e.target.value
    },
    taxTypeChange (e) {
      this.index = e.target.value
      this.queryParamsInvoiceHeader.invoiceType = this.invoiceType[this.index]
      this.getInvoiceHeeder()
    },
    mailTypeChange (e) {
      this.mailIndex = e.target.value
    },
    checkboxChange (e) {
      let arr = e.target.value
      this.orderlist = []
      this.totalPrice = 0
      arr.forEach(item => {
        this.orderlist.push(this.noInvoicingOrderList[item])
        this.totalPrice += this.noInvoicingOrderList[item].ActPrice
      })
    },
    getInvoiceHeeder () {
      invoiceHeaderCheck(this.queryParamsInvoiceHeader).then(res => {
        if (res.Code === 200) {
          this.arrayType = []
          this.invoiceHeaderList = res.Data
          res.Data.forEach(item => {
            this.arrayType.push(item.InvoiceName)
          })
        }
      })
    },
    getMailAddresss () {
      mailAddressCheck().then(res => {
        if (res.Code === 200) {
          this.mailAddressList = res.Data
          this.arrayMail = []
          res.Data.forEach(item => {
            this.arrayMail.push(item.AddressInfo)
          })
        }
      })
    },
    getNoInvoicingOrder () {
      if (this.queryParams.pageIndex <= this.maxPage) {
        noInvoicingOrder(this.queryParams).then(res => {
          if (res.Code === 200) {
            this.maxPage = Math.ceil(res.Data.Count / this.queryParams.pageSize)
            res.Data.List.forEach(item => {
              item.CheckinTime = item.CheckinTime.split('T')[0]
              item.CheckoutTime = item.CheckoutTime.split('T')[0]
            })
            this.noInvoicingOrderList = this.noInvoicingOrderList.concat(res.Data.List)
            this.queryParams.pageIndex += 1
          }
        })
      }
    },
    // 开票
    addInvoice () {
      if (!this.mailAddressList[this.mailIndex].ReceiverName || !this.invoiceHeaderList[this.indexType].InvoiceName) {
        wx.showToast({
          title: '开票前完善相关信息', // 提示的内容,
          icon: 'none', // 图标,
          duration: 2000, // 延迟时间,
          mask: true, // 显示透明蒙层，防止触摸穿透,
          success: res => {}
        })
      } else {
        let params = {}
        params.InvoiceType = this.queryParamsInvoiceHeader.invoiceType
        params.InvoiceName = this.invoiceHeaderList[this.indexType].InvoiceName
        params.IdentifyNumber = this.invoiceHeaderList[this.indexType].IdentifyNumber
        params.CompanyAddress = this.invoiceHeaderList[this.indexType].CompanyAddress
        params.CompanyPhone = this.invoiceHeaderList[this.indexType].CompanyPhone
        params.BankName = this.invoiceHeaderList[this.indexType].BankName
        params.BankAccount = this.invoiceHeaderList[this.indexType].BankAccount
        params.TotalPrice = this.totalPrice
        params.ReceiveId = this.mailAddressList[this.mailIndex].Id
        params.ReceiverName = this.mailAddressList[this.mailIndex].ReceiverName
        params.AddressInfo = this.mailAddressList[this.mailIndex].AddressInfo
        params.ReceiverPhoneNumber = this.mailAddressList[this.mailIndex].ReceiverPhoneNumber
        params.PostalCode = this.mailAddressList[this.mailIndex].PostalCode
        params.InvoiceContent = '代订酒店服务费'
        params.OrderIds = this.orderlist
        invoiceAdd(params).then(res => {
          if (res.Code === 200) {
            this.orderlist = []
            wx.showToast({
              title: '开票成功', // 提示的内容,
              icon: 'success', // 图标,
              duration: 2000, // 延迟时间,
              mask: true, // 显示透明蒙层，防止触摸穿透,
              success: res => {
                this.orderStatus = true
                this.apply = 3
                wx.navigateTo({ url: '../../pages/invoice/main' })
              }
            })
          }
        })
      }
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {
    this.getNoInvoicingOrder()
  },
  onUnload () {
    if (this.apply === 2) {
      this.orderStatus = true
      this.orderlist = []
      wx.navigateTo({ url: '../../pages/applyInvoice/main' })
    }
  },
  onLoad () {
    this.queryParams.pageIndex = 1
    this.maxPage = 1
    this.noInvoicingOrderList = []
    this.orderStatus = true
    this.apply = 1
    this.getNoInvoicingOrder()
    this.getInvoiceHeeder()
    this.getMailAddresss()
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
.footer{
 position: fixed;
  bottom: 0;
  background: #eee;
  width: 100vw;
  height: 96rpx;
  z-index: 999;

}

.btn {
  width: 90vw;
  margin-left: 5vw;
  height: 80rpx;
  margin-top: 8rpx;
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
    max-width: 60%;
    font-size: 28rpx;
    overflow: hidden;
    text-overflow: ellipsis;
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
