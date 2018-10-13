<template>
  <div class="success-warp">
    <img :src="successimg" alt="" width="">
 <a href="/pages/orderLists/main"> <button class="check">查看订单</button></a>
  <a href="/pages/index/main"><button class="back" @click="goIndex()">返回酒店首页</button></a>
  </div>
</template>

<script>
import successimg from '@/asset/images/Successfulpayment_icon@2x.png'
export default {
  data () {
    return {
      successimg: successimg
    }
  },
  methods: {
    goIndex () {
      wx.switchTab({ url: '../../pages/index/main' })
    }
  }
}
</script>
<style scope>
.success-warp{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
}
img{
  width: 254rpx;
  height: 186rpx;
  margin-bottom: 40rpx;
}
button{
  width: 80vw;
  font-size: 30rpx;
  margin:20rpx 0;
  border-radius: 20rpx;
}
.check{
  background: #ff2d50;
  color:#fff;
}
.back{
  background: #fff;
  color:#ff2d50;
  border:1px solid #ff2d50
}
</style>
