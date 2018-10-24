<template>
<div class="wrap">
  <div class="wrap-detail">
       <P class="title">开票信息</P>
       <ul class="list">
           <li><span>发票抬头：</span><span>{{invoiceDetail.InvoiceName}}</span></li>
           <li><span>发票明细：</span><span>{{invoiceDetail.InvoiceContent}}</span></li>
           <li><span>公司地址：</span><span>{{invoiceDetail.CompanyAddress}}</span></li>
           <li><span>公司电话：</span><span>{{invoiceDetail.CompanyPhone}}</span></li>
           <li><span>开户银行名称：</span><span>{{invoiceDetail.BankName}}</span></li>
           <li><span>开户银行账号：</span><span>{{invoiceDetail.BankAccount}}</span></li>
           <li><span>开票金额：</span><span>￥{{invoiceDetail.TotalPrice}}</span></li>
       </ul>
       <P class="title">开票信息</P>
        <ul class="list">
           <li><span>收件人：</span><span>{{invoiceDetail.ReceiverName}}</span></li>
           <li><span>邮寄地址：</span><span>{{invoiceDetail.AddressInfo}}</span></li>
           <li><span>邮政编码：</span><span>{{invoiceDetail.PostalCode}}</span></li>
       </ul>
      <P class="title">发票信息</P>
      <ul class="list">
           <li><span>发票状态：</span><span>{{invoiceDetail.InvoiceStatus}}</span></li>
           <li><span>申请时间：</span><span>{{invoiceDetail.InvoiceTime}}</span></li>
           <li><span>开票时间：</span><span>{{invoiceDetail.InvoiceTime}}</span></li>
       </ul>
       <P class="title">开票相关酒店</P>
       <ul class="list" v-for="(item,index) in invoiceDetail.Details" :key="index">
           <li>上海瑞铂回家酒店 (2018-10-19 到 2018-10-23)</li>
           <li>金额：￥{{item.OrderPrice}}</li>
       </ul>
  </div>
  </div>
</template>

<script>
import {getInvoiceDetail} from '@/utils/api'
import {paramsTime} from '@/utils/index'
export default {
  data () {
    return {
      invoiceDetail: {

      }
    }
  },
  methods: {
    loadData (id) {
      getInvoiceDetail(id).then(res => {
        if (res.Code === 200) {
          this.invoiceDetail = res.Data
          this.invoiceDetail.InvoiceTime = paramsTime(new Date(this.invoiceDetail.InvoiceTime))
        }
      })
    }
  },
  onShow () {
    this.loadData(this.$root.$mp.query.id)
  }
}
</script>

<style scoped>
.wrap{
    background: #eee;
    min-height: 100vh;
    padding: 30rpx 0;
}
.wrap-detail{
    padding-bottom: 100rpx;
    padding-top: 30rpx;
    width: 90vw;
    margin: 0 auto;
    background: #fff;
    border-radius: 10rpx;
}
.title{
    font-size: 30rpx;
    color: #000;
    font-weight: 600;
    margin: 20rpx ;
}
.list li{
    line-height: 2;
    font-size: 28rpx;
    color:#777;
    margin-left: 40rpx;
    letter-spacing: 2rpx;
}
</style>
