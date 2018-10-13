<template>
<div>
 <ul class="discounts" v-if="list.length">
   <li v-for="(item,index) in list" :key="index" v-if="item.Status==0" @click="select(item)">
      <div class="left"><p>适用酒店：<span v-if="item.HotelId">{{item.HotelName}}</span><span v-if="!item.HotelId">所有酒店</span></p><p>有效期：<span v-if="item.BeginTime&&item.EndTime">{{item.BeginTime}}到{{item.EndTime}}</span><span v-if="!item.BeginTime||!item.EndTime">不限</span></p></div>
      <div class="right"><p><span>￥</span><span>{{item.OffsetMoney}}</span></p><p class="tj" v-if="item.QuotaUse">满{{item.QuotaUse}}元使用</p></div>
    </li>
  </ul>
    <p style="font-size:28rpx;color:#666;text-align:center;margin-top:10rpx" v-if="!list.length">暂可用优惠券！</p>
  </div>
  
</template>

<script>

export default {
  data () {
    return {
      maxPage: 1,
      list: []

    }
  },
  methods: {
    select (discount) {
      discount.RoomNum = this.$root.$mp.query.RoomNum
      discount = JSON.stringify(discount)
      wx.setStorageSync('discount', discount)
      wx.navigateBack({
        delta: 1 // 返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      })
    }
  },
  onShow () {
    this.list = JSON.parse(this.$root.$mp.query.orderDiscount)
  }
}
</script>

<style scope>
 page{
   background: #eee;
 }
 .tj{
font-size: 26rpx;
color:#999;
text-align: center;
 }
 .discounts li{
   margin: 20rpx 30rpx;
   background: #fff;
   border-radius: 10rpx;
   height: 160rpx;
   display: flex;
   justify-content: space-between;
   box-shadow: 10rpx 10rpx 10rpx #eee;
  
 }
 .left{
   flex:1;
   margin-left: 30rpx;
 }
 .right{
margin-right: 20rpx;
  height: 160rpx;
   color:#ff2d50;
   display: flex;
   flex-direction: column;
   align-items: flex-end;
   justify-content: center;
 }
.cant-use  .right{
  color:#999;
}
 .right>p>span:nth-child(1){
   font-size: 28rpx;
 }
 .right>p>span:nth-child(2){
   font-size: 60rpx;

 }
  .left p{
    height: 80rpx;
    line-height: 80rpx;
  }
.left p:nth-child(1){
    font-size: 30rpx;
    font-weight: 600;
    color:#333;
    }
    .cant-use .left p:nth-child(1){
       color:#999;
    }
.left p:nth-child(2){
  font-size: 28rpx;
  color:#999;
    }
</style>
