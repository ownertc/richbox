<template>
  <div class="pay-warp">
    <div class="pay-detail">
      <ul class="pay-list">
         <li>应付总额：￥{{zoomTypeDetail.totalPrice}}</li>
         <li>{{zoomTypeDetail.hotelName}}</li>
         <li>{{zoomTypeDetail.Name}}</li>
         <li><span>入住{{zoomTypeDetail.checkin}}</span><span>离店{{zoomTypeDetail.checkout}}</span><span>{{zoomTypeDetail.totalNight}}晚</span></li>
         <li>预定人:&nbsp;&nbsp;{{zoomTypeDetail.user}}</li>
      </ul>
    </div>
    <div class="pay-methods">
      <p class="pay-title">支付方式</p>
      <P><i class="fa fa-wechat" style="color:#51c332"></i><span class="wx">微信支付</span></P>
    </div>
 <button class="btn" @click="wxPay">立即支付</button>
  </div>
</template>
<script>
import {wxpay} from '@/utils/api'
export default {
  data () {
    return {
      zoomTypeDetail: {},
      totalPrice: 0
    }
  },
  methods: {
    /**
     *微信支付
     */
    wxPay () {
      wxpay(this.zoomTypeDetail.orderId).then(res => {
        wx.requestPayment({
          'timeStamp': res.Data.timeStamp,
          'nonceStr': res.Data.nonceStr,
          'package': res.Data.package,
          'signType': res.Data.signType,
          'paySign': res.Data.paySign,
          'success': function (res1) {
            // console.log(res1);
            if (res1.errMsg === 'requestPayment:ok') {
              wx.redirectTo({
                url: '/pages/paySuccess/main'
              })
            }
          },
          'fail': function (res) {

          }
        })
      })
    }
  },
  onShow () {
    this.zoomTypeDetail = JSON.parse(this.$root.$mp.query.zoomTypeDetail)
  }

}
</script>
<style scope>
page{
  background: #eee;
}
.pay-list{
padding: 30rpx;
box-sizing: border-box;
background: #fff;
margin-bottom: 30rpx;
}
.pay-list li{
  margin-bottom: 20rpx;
   color: #666;
  font-size: 28rpx;
}
.pay-list li span{
  margin-right: 30rpx;
}
.pay-list li:nth-child(1){
  font-size: 32rpx;
  color:#000;
}
.pay-methods{
  padding: 30rpx;
  background: #fff;

}
.pay-title{
  font-size:30rpx;
  color: #000;
  margin-bottom: 30rpx;
}
.wx{
  color:#333;
  font-size: 30rpx;
  margin-left: 30rpx;
}
.btn{
width: 90vw;
margin: 60rpx auto;
color:#fff;
background:#ff2d50;
font-size: 30rpx;

}
</style>
