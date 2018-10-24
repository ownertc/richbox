<template>
  <div>
   <div class="user-info">
       <img :src="avatar" class="avater"/>
     <div class="user-detail">
       <p><span class="username">{{userInfo.Name}}</span><span class="garden">{{userInfo.VipLevelName}}</span></p>
       <p class="grade">积分：{{userInfo.Score}}</p>
       </div>
   </div>
   <ul class="navbar">
     <li><a href="/pages/orderLists/main?currIndex=0"><img :src="all" alt=""/><span>全部订单</span></a></li>
     <li><a  href="/pages/orderLists/main?currIndex=1"><img :src="timing" alt=""/><span>进行中</span></a></li>
     <li><a  href="/pages/orderLists/main?currIndex=2"><img :src="order3" alt=""/><span>已完成</span></a></li>
     <li><a  href="/pages/orderLists/main?currIndex=3"><img :src="order2" alt=""/><span>已取消</span></a></li>
   </ul>
   <ul class="list">
     <li><a href="/pages/discount/main"><span>抵用券</span><span>{{totalVols}}张</span></a></li>
     <li><a href="/pages/commonInfo/main"><span>常用信息</span><i class="fa fa-angle-right" style="line-height:80rpx;font-size:40rpx;color:#999"></i></a></li>
     <li><a href="/pages/invoice/main"><span>我的发票</span><i class="fa fa-angle-right" style="line-height:80rpx;font-size:40rpx;color:#999"></i></a></li>
   </ul>
  </div>
</template>

<script>
import {getUserInfo, getVouchList} from '@/utils/api'
import all from '@/asset/images/all.png'
import timing from '@/asset/images/time.png'
import order2 from '@/asset/images/order2.png'
import order3 from '@/asset/images/order3.png'
import avatar from '@/asset/images/avatar.png'
import card from '@/components/card'

export default {
  data () {
    return {
      all,
      timing,
      order3,
      order2,
      avatar,
      userInfo: {},
      totalVols: 0,
      user: wx.getStorageSync('User'),
      vonQueryparms: {
        pageIndex: 1,
        pageSize: 10000
      }
    }
  },
  methods: {
    getBasiInfo () {
      getUserInfo().then(res => {
        this.userInfo = res.Data
      })
    },
    getVoList () {
      getVouchList(this.vonQueryparms).then((res) => {
        let discount = 0
        res.Data.forEach(item => {
          if (item.Status === 0 && !item.IsUse) {
            discount += 1
          }
        })
        this.totalVols = discount
      })
    }
  },
  components: {
    card: card
  },
  onShow () {
    this.getBasiInfo()
    this.getVoList()
  }
}
</script>

<style scope>
.list{
  margin: 30rpx;
}
.list li a{
  height: 80rpx;
  line-height: 80rpx;
  border-bottom: 2rpx solid #eee;
  font-size: 30rpx;
  color:#333;
  display: flex;
  justify-content: space-between;
}
.navbar{
  display: flex;
  padding:80rpx  60rpx;
  justify-content: space-between;
  align-items: center;
  border-bottom: 10rpx solid #eee;
  
}
.navbar li a{
  flex:1;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 30rpx;
}
.navbar img{
  width:40rpx;
  height: 45rpx;
  margin-bottom: 20rpx;
}
.user-info{
  margin: 60rpx;
  display: flex;

}
.user-info .avater{
   width:150rpx;
   height: 150rpx;
   border-radius: 50%;
   overflow: hidden;
   margin-right: 30rpx;
}
.username{
  font-size: 30rpx ;
  color: #333;
}
.garden{
  margin-left: 20rpx;
  border-radius: 6rpx;
  color:#fff;
  font-size: 30rpx;
  padding: 4rpx 10rpx;
  background: #ffc513;
}
.grade{
  margin-top: 40rpx;
  font-size: 30rpx;
  color: #666;
}
</style>
