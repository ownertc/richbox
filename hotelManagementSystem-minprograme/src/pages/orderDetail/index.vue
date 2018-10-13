<template>
  <div>
    <div class="top">
      <p class="title"><span>{{detail.HotelName}}</span><i class="fa fa-angle-right"></i></p>
      <p class="detail"><span>{{detail.GuestRoomTypeName}}</span></p>
      <p class="detail"><span>入住{{detail.CheckinTime}}</span><span>离店{{detail.CheckoutTime}}</span><span>{{detail.totalNights}}晚</span></p>
    </div>
     <div class="main">
      <p class="title"><span>订单详情</span></p>
      <p class="detail"><span>订单编号</span><span class="black">{{detail.OrderNum}}</span></p>
      <p class="detail"><span>预订时间</span><span class="black">{{detail.ReserveTime}}</span><span class="black"></span></p>
      <p class="detail"><span>订单总金额</span><span class="black">￥{{detail.ActPrice}}</span></p>
     <p class="detail"><span>抵用券</span><span class="black">￥0</span></p>
     <p class="detail"><span>实付金额</span><span class="black">￥{{detail.ActPrice}}</span></p>
     <p class="detail"><span>支付状态</span><span class="black">{{detail.PayStatus_Name}}</span></p>
     <p class="detail"><span>订单状态</span><span class="black">{{detail.OrderStatus_Name}}</span></p>
    </div>
    <div class="bottom">
        <p class="detail"><span>预订人&nbsp;&nbsp;</span><span class="black">{{detail.GuestName}}</span></p>
        <div class="line"></div>
        <p class="detail"><span>手机号码</span><span class="black">{{detail.Phone}}</span></p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      detail: {}
    }
  },
  methods: {
  },
  onShow () {
    this.detail = JSON.parse(this.$root.$mp.query.orderDetail)
  }
}
</script>

<style scope>
page{
  background: #eee;
}
.top,.main,.bottom{
  background: #fff;
  padding: 30rpx;
  box-sizing: border-box;
  margin-bottom: 40rpx;
}
.line{
  width:100%;
  height: 2px;
  background:  #ccc;
  transform: scaleY(0.2);
}
.title {
  display: flex;
  justify-content: space-between
}
.title span{
  font-size: 32rpx;
  flex:1;
}
.title i{
  font-size: 40rpx;
}
.detail span{
  font-size: 30rpx;
  color:#666;
  margin-right: 40rpx;
}
.bottom .detail{
  margin: 20rpx 0;
}
.black{
  color:#000 !important;
}
</style>
