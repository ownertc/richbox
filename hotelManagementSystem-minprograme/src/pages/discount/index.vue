<template>
<div>
 <ul class="discounts" v-if="list.length">
   <li v-for="(item,index) in list" :key="index" v-if="item.Status==0&&!item.IsUse" @click="select(item)">
      <div class="left"><p>适用酒店：<span v-if="item.HotelId">{{item.HotelName}}</span><span v-if="!item.HotelId">所有酒店</span></p><p>有效期：<span v-if="item.BeginTime&&item.EndTime">{{item.BeginTime}}到{{item.EndTime}}</span><span v-if="!item.BeginTime||!item.EndTime">不限</span></p></div>
      <div class="right"><p><span>￥</span><span>{{item.OffsetMoney}}</span></p><p class="tj" v-if="item.QuotaUse">满{{item.QuotaUse}}元使用</p></div>
    </li>
  </ul>
    <p style="font-size:28rpx;color:#666;text-align:center;margin-top:10rpx" v-if="!list.length">暂可用优惠券！</p>
  </div>
  
</template>

<script>
import {getVouchList, GetByUserId} from '@/utils/api'
export default {
  data () {
    return {
      maxPage: 1,
      list: [],
      queryParams: {
        hotelId: '',
        money: '',
        pageIndex: 1,
        pageSize: 10000
      }
    }
  },
  methods: {
    loadData () {
      if (this.maxPage >= this.queryParams.pageIndex) {
        if (this.queryParams.hotelId && this.queryParams.money) {
          GetByUserId(this.queryParams).then(res => {
            if (res.Data.List) {
              this.list = this.list.concat(res.Data)
              this.maxPage = Math.ceil(res.Data.Count / this.queryParams.pageSize)
              this.queryParams.pageIndex++
            }
          })
        } else {
          getVouchList(this.queryParams).then(res => {
            if (res.Data) {
              res.Data.forEach((item, index) => {
                item.BeginTime = item.BeginTime ? item.BeginTime.split('T')[0] : item.BeginTime
                item.EndTime = item.EndTime ? item.EndTime.split('T')[0] : item.EndTime
              })
              this.list = this.list.concat(res.Data)
              this.queryParams.pageIndex++
            }
          })
        }
      }
    },
    select (item) {
      if (this.queryParams.hotelId && this.queryParams.money) {
        wx.navigateBack({
          delta: 1 // 返回的页面数，如果 delta 大于现有页面数，则返回到首页,
        })
      }
    }
  },
  onLoad () {
    this.queryParams.hotelId = this.$root.$mp.query.hotelId
    this.queryParams.money = this.$root.$mp.query.money
    this.loadData()
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
