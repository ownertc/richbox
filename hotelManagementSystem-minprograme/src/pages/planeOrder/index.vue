<template>
  <div class="planeorder-app">
   <div class="zoom-order-detail">
     <p class="zoom-order-title" @click="zoomDetailStatus=true"><span>{{zoomDetail.GuestRoomType.NameCode}}</span><i class="fa fa-angle-right"></i></p>
     <ul class="zoom-order-lists">
        <li>入住 {{orderDetails.CheckinTime}}&nbsp;&nbsp;离店 {{orderDetails.CheckoutTime}}&nbsp;&nbsp;共{{totalNight}}晚</li>
        <li>床型：{{zoomTypeDetail.BedType_Name}}</li>
        <li>早餐： {{zoomTypeDetail.BreakfastInfo_Name}}</li>
     </ul>
   </div>
   <div class="zoom-nums">
     <span>房间数</span>
     <div class="btns">
       <i class="fa fa-minus-circle" :style="{color:orderDetails.RoomNum<=1?'#999':'#000'}" @click="decress"></i>
       <span>{{orderDetails.RoomNum}}</span>
       <i class="fa fa-plus-circle"  @click="add"></i>
     
     </div>
   </div>
   <ul class="userInfo">
     <li class="user" @click="userlistSatuts=true" >
       <span>入住人</span><input type="text"  v-model="name" ><i class="fa" :class="{'fa-angle-up':userlistSatuts,'fa-angle-down':!userlistSatuts}" style="pading-left:30rpx" ></i>
     </li>
      <ul class="userlist" v-if="userlistSatuts">
         <li v-for="(user,index) in userLists" :key="index" @click="getSelect(user)" class="item"><span>{{user.Name}}</span><span>{{user.Mobile}}</span></li>
       </ul>
     <div class="line"></div>
     <li><span>手机号码</span><input type="number" v-model="tel"></li>
   </ul>
   <div class="discount" @click="selectDiscount()"><span>{{discount.Name}}</span><span v-if="discount.Money">已经优惠{{discount.Money}}元</span><span v-if="discountList.length===0&&!discount.Money">无可用抵用券</span><i class="fa fa-angle-right" ></i></div>
   <div class="fapiao" style="background:#fff"><span>发票</span><span>如需发票，请到酒店前台索取</span></div>
   <div style="text-indent:30rpx;"><i class="fa fa-info-circle" aria-hidden="true" style="color:#ff2d50;margin-right:20rpx;"></i><span style="color:#666;font-size:28rpx;">温馨提示：若未能在到店时间内办理酒店入住，请提前联系前台，协商房间保留事宜，以免房间被过时取消</span></div>
   <div class="payinfo">
         <p><span  v-if="zoomTypeDetail.Payway=='GPAZXF0001'">在线付:</span><span  v-if="zoomTypeDetail.Payway=='GPADDF0001'">到店付:</span><span>￥{{ActPrice}}</span></p>
        <button @click="confirmOrder()"><span v-if="zoomTypeDetail.Payway=='GPAZXF0001'">去支付</span><span v-if="zoomTypeDetail.Payway=='GPADDF0001'">提交订单</span></button>
   </div>

    <!--房间详情开始-->
<div class="detail" :class="{show:zoomDetailStatus}">
  <scroll-view class="zoom-detail" v-if="zoomDetailStatus" scroll-y  style="height:500rpx;position:absolute;bottom:0;background:#fff">
 
       <div class="zoom-title"><p><span class="bz">{{zoomDetail.GuestRoomType.NameCode}}</span><span class="zc">{{zoomTypeDetail.BreakfastInfo_Name}}早餐</span></p><i class="fa fa-times-circle-o" style="color:#999;font-size:35rpx;" @click="zoomDetailStatus=false"></i></div>
       <div class="zoom-main">
         <ul class="base">
           <li class="base-item"><span>面积：</span><span>{{zoomTypeDetail.Area}}m2</span></li>
           <li  class="base-item"><span>可住：</span><span>{{zoomTypeDetail.PersonNum}}人</span></li>
           <li  class="base-item"><span>床型：</span><span>{{zoomTypeDetail.BedType_Name}}</span></li>
           <li  class="base-item"><span>便利设施：</span><span>{{zoomTypeDetail.WindowInfo_Name}}</span></li>
           <li  class="base-item"><span>楼层：</span><span>{{zoomTypeDetail.FloorRange}}层</span></li>
         </ul>
         <div class="zoom-facity">
           <p class="zoom-fac-title"><span>房间设施</span><i class="fa fa-angle-right" style="font-size:40rpx;color:#666"></i></p>
           <p class="zoom-desc">
             <span v-for="(item,index) in zoomDetail.ConfigList" :key="index" style="margin-right:30rpx">{{item.Value}}</span>
           </p>
         </div>
         <div class="line"></div>
         <div class="zoom-cancle" v-if="zoomTypeDetail.Payway=='GPADDF0001'"><span>免费取消</span><span>订单提交后随时可以取消，不收取任何费用</span></div>
          <div class="zoom-cancle" v-if="zoomTypeDetail.Payway=='GPAZXF0001'"><span>不可取消</span><span>订单一旦生成，不可取消！</span></div>
       </div>
       <div class="line"></div>
    
  </scroll-view>
</div>
  <!--房间详情结束-->
  </div>
</template>
<script>
import {getCommonInfoList, orderAdd, GetByUserId} from '@/utils/api'
export default {
  data () {
    return {
      zoomDetailStatus: false,
      orderDetail: false,
      userlistSatuts: false,
      totalNight: 0,
      discount: {
        Name: '抵用券',
        Money: 0
      },
      discountList: [],
      zoomDetail: {},
      zoomTypeDetail: {},
      orderDetails: {
        RoomNum: 1
      },
      queryParms: {
        pageIndex: 1,
        pageSize: 1000
      },
      discountQuery: {
        hotelId: 0,
        money: 0,
        pageIndex: 1,
        pageSize: 10000
      },
      tel: '',
      name: '',
      userLists: []
    }
  },
  computed: {

    totalPrice () {
      let total = this.zoomTypeDetail.TotalPrice * this.orderDetails.RoomNum
      this.orderDetails.TotalPrice = total
      return total
    },
    ActPrice () {
      this.orderDetails.ActPrice = this.totalPrice - this.discount.Money
      return this.orderDetails.ActPrice
    }
  },
  methods: {
    selectDiscount () {
      if (this.discountList.length > 0) {
        let RoomNum = this.orderDetails.RoomNum
        let orderDiscount = JSON.stringify(this.discountList)
        wx.navigateTo({ url: `../../pages/orderDiscount/main?orderDiscount=${orderDiscount}&RoomNum=${RoomNum}` })
      }
    },
    getDiscount () {
      this.discountList = []
      GetByUserId(this.discountQuery).then(res => {
        if (res.Code === 200) {
          res.Data.List.forEach((item, index) => {
            if (item.OffsetMoney <= this.orderDetails.TotalPrice && item.Status === 0) {
              item.BeginTime = item.BeginTime ? item.BeginTime.split('T')[0] : item.BeginTime
              item.EndTime = item.EndTime ? item.EndTime.split('T')[0] : item.EndTime
              this.discountList.push(item)
            }
          })
        }
      })
    },
    getList () {
      getCommonInfoList(this.queryParms).then(res => {
        if (res.Code === 200) {
          this.userLists = this.userLists.concat(res.Data)
        }
      })
    },
    decress () {
      this.orderDetails.RoomNum = Math.max(this.orderDetails.RoomNum - 1, 1)
      this.discountQuery.money = this.totalPrice
      this.orderDetails.TotalPrice = this.totalPrice
      this.getDiscount()
    },
    add () {
      this.orderDetails.RoomNum += 1
      this.discountQuery.money = this.totalPrice
      this.orderDetails.TotalPrice = this.totalPrice
      this.getDiscount()
    },
    getSelect (user) {
      this.name = user.Name
      this.tel = user.Mobile
      this.orderDetails.GuestName = this.name
      this.orderDetails.phone = this.tel
      this.userlistSatuts = false
    },
    /**
     *确认订单
     */
    confirmOrder () {
      let zoomTypeDetail = this.zoomTypeDetail
      zoomTypeDetail.Name = this.zoomDetail.GuestRoomType.NameCode
      zoomTypeDetail.tel = this.orderDetails.phone
      zoomTypeDetail.user = this.orderDetails.GuestName
      zoomTypeDetail.checkin = this.orderDetails.CheckinTime
      zoomTypeDetail.checkout = this.orderDetails.CheckoutTime
      zoomTypeDetail.totalPrice = this.ActPrice
      zoomTypeDetail.totalNight = this.totalNight
      orderAdd(this.orderDetails).then(res => {
        if (res.Code === 200) {
          switch (this.zoomTypeDetail.Payway) {
            case 'GPAZXF0001':
              zoomTypeDetail.orderId = res.Data.Id
              zoomTypeDetail = JSON.stringify(zoomTypeDetail)
              wx.navigateTo({url: `../../pages/paySelect/main?zoomTypeDetail=${zoomTypeDetail}`})
              break
            case 'GPADDF0001':
              wx.showToast({
                title: '预订成功', // 提示的内容,
                icon: 'success', // 图标,
                duration: 2000, // 延迟时间,
                mask: true, // 显示透明蒙层，防止触摸穿透,
                success: res => {
                  setTimeout(() => { wx.switchTab({ url: '../../pages/index/main' }) }, 2000)
                }
              })
          }
        } else {
          wx.showToast({
            title: `预订失败,${res.ShowData}`, // 提示的内容,
            icon: 'none', // 图标,
            duration: 2000, // 延迟时间,
            mask: true, // 显示透明蒙层，防止触摸穿透,
            success: res => {}
          })
        }
      })
    }
  },
  created () {
  },
  onShow () {
    this.zoomDetailStatus = false
    this.userLists = []
    this.userLists.push(wx.getStorageSync('User'))
    let zoomDetail = JSON.parse(this.$root.$mp.query.currZoomDetail)
    let zoomTypeDetail = JSON.parse(this.$root.$mp.query.currZoomtypeDetail)
    this.totalNight = this.$root.$mp.query.days
    this.zoomDetail = zoomDetail
    this.zoomTypeDetail = zoomTypeDetail
    let user = wx.getStorageSync('User')
    this.orderDetails.HotelId = zoomTypeDetail.HotelId
    this.orderDetails.GuestRoomId = zoomTypeDetail.Id
    this.orderDetails.GuestRoomTypeId = zoomTypeDetail.GuestRoomTypeId
    this.orderDetails.ReserveTime = new Date()
    this.orderDetails.CheckinTime = this.$root.$mp.query.checkin
    this.orderDetails.CheckoutTime = this.$root.$mp.query.checkout
    this.orderDetails.GuestName = user.Name
    this.orderDetails.phone = user.Mobile
    this.orderDetails.RoomNum = 1
    this.orderDetails.PayType = zoomTypeDetail.Payway
    this.orderDetails.PayMethod = 'OMAAWX0001'
    this.orderDetails.TotalPrice = zoomTypeDetail.TotalPrice
    this.orderDetails.ActPrice = this.orderDetails.TotalPrice
    this.orderDetails.UsersVoucherId = 0
    this.orderDetails.ReserveType = 'VTAASJ0001'
    this.name = user.Name
    this.tel = user.Mobile

    wx.setNavigationBarTitle({title: this.zoomTypeDetail.hotelName})
    this.discountQuery.money = this.orderDetails.TotalPrice
    this.discountQuery.hotelId = this.orderDetails.HotelId
    if (wx.getStorageSync('discount')) {
      let discount = JSON.parse(wx.getStorageSync('discount'))
      this.discount.Money = discount.OffsetMoney
      this.orderDetails.UsersVoucherId = discount.UsersVoucherId
      this.orderDetails.RoomNum = discount.RoomNum
      wx.removeStorageSync('discount')
    } else {
      this.discount.Money = 0
      this.orderDetails.UsersVoucherId = 0
    }
    this.getDiscount()
    this.getList()
  }
}
</script>

<style scope>
page{
  background: #efefef;
}
.zoom-order-detail{
  background: #fff;
}
.zoom-order-title{
display: flex;
padding: 30rpx;
box-sizing: border-box;
font-size: 30rpx;
justify-content: space-between;
color:#333;
}
.zoom-order-lists{
  padding-bottom: 30rpx;
 
}
.zoom-order-title i{
  font-size: 43rpx;
  color:#666;
}
.zoom-order-lists li{
  color: #999999;
  margin: 0 30rpx 10rpx 30rpx;
  font-size: 28rpx;
}
.zoom-nums,.discount,.fapiao{
  background: #fff;
  margin: 30rpx 0;
  display: flex;
  justify-content: space-between;
  padding: 30rpx ;
  box-sizing: border-box;

}
.fapiao{
  background: #eee;
}
.zoom-nums>span,.discount>span,.fapiao>span{
  font-size:30rpx;
  color:#333;
}
.btns i{
  font-size: 40rpx;
  margin: 0 30rpx;
}
.btns span{
  color:#ff2d50;
  font-size: 36rpx;
}
.userInfo{
  background: #fff;
  margin-bottom: 30rpx;
  padding:20rpx 30rpx;
  box-sizing: border-box;
  position: relative;
}
.line{
  width:100%;
  height: 2px;
  background:  #ccc;
  transform: scaleY(0.2);
}
.userInfo>li{
display: flex;
justify-content: space-between;
margin: 20rpx 0
}
.userInfo span{
  color: #333;
  font-size: 30rpx;
}
.userInfo input{
  width:60%;
  font-size: 30rpx;
}
.payinfo{
  width: 100vw;
  display: flex;
  justify-content: space-between;
  height: 96rpx;
  padding:0  30rpx;
  align-items: center;
  box-sizing: border-box;
  position: fixed;
  bottom:0;
  background: #fff;
  border-top: 2rpx solid #ccc;
}
.payinfo p{
  flex:1;
}
.payinfo p>span:nth-child(1){
  font-size: 30rpx;
  color:#000;
}
.payinfo p>span:nth-child(2){
  font-size: 32rpx;
   color:#FF2d50;
   font-weight: 700;
}
button {
background: #FF2d50;
color: #fff;
font-size: 30rpx;
border-radius: 30rpx;
padding: 20rpz 40rpx;
}
.mx{
  font-size: 28rpx; 
  margin-right: 30rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  border:2rpx solid orange;
  color:orange;
  height: 40rpx;
  line-height: 40rpx;
  margin-top: 20rpx;
}
.order-detail{
  width: 100vw;
  position: fixed;
  top:0;
  bottom: 96rpx;
  background: rgba(0, 0,0, .5);
}
.order-list{
  background: #fff;
  position: absolute;
  bottom:0;
  width: 100vw;
  padding: 30rpx;
  box-sizing: border-box;
}
.order-list li{
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-bottom: 20rpx;
}
.order-list li p,.order-list li span{
  flex:1;
  font-size: 28rpx;
  color:#333;
  text-align: center;
}
.other{
  text-align: right;
  margin-right: 30rpx;
  font-size: 30rpx;
  color:#000;
}
.user{
  position: relative;
}
.userlist{
 position: absolute;
 left:10%;
 width: 80%;
 background: #fefefe;
 top:100rpx;
 z-index: 999;
 max-height: 500rpx;
 overflow-y: scroll;
 box-shadow: 5rpx 5rpx 5rpx #ccc;
 border:2rpx solid #ccc;
 padding: 30rpx;
 box-sizing: border-box;
}
.userlist .item{
  height:80rpx;
  line-height:80rpx;
  border-bottom: 2rpx solid #eee;
  display: flex;
  justify-content: space-between;
}
.userlist .item>span:nth-child(1){
  font-size:32rpx;
}
.userlist .item>span{
margin-right: 30rpx;
}
.detail{
  position: fixed;
  top:0;
  bottom: 0;
  height: 100%;
  background: rgba(0,0,0,0.5);
  filter: blur(0.1);
  z-index: 999999;
  width: 100%;
  transition: all .5s;
  transform: translateY(-100%)
}
.detail.show{
  transform: translateY(0)
}
.zoom-wrap{
  position: absolute;
  bottom: 0;
  background: #ffffff;
  width: 100vw;
}
.zoom-title{
  display: flex;
  justify-content: space-between;
  padding:  20rpx;
  width: 100%;
  box-sizing: border-box;
  background: #EEE;
  position: fixed;
  left: 0;
  bottom:420rpx;
  z-index: 999;
}
.zoom-main{
  max-height: 45vh;
  overflow:scroll;
  margin-top: 100rpx;
}


.bz{
  font-size:28rpx;
  color:#333;
  letter-spacing: 1px;
  margin-right: 20rpx;
}
.zc{
  font-size: 24rpx;
  color:#666;
}
.base{
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin: 0 30rpx;
}
.base-item{
  width:50%;
}
.base-item>span:nth-child(1){
  font-size: 28rpx;
  color:#666;
}
.base-item>span:nth-child(2){
  font-size: 26rpx;
  color:#999;
}
.zoom-fac-title{
  display: flex;
  justify-content: space-between;
  margin: 20rpx 30rpx;
  font-size: 28rpx;
  color:#000;
  
}
.zoom-desc{
  font-size: 26rpx;
  color:#666;
  line-height: 2;
  text-indent: 40rpx;
}
.zoom-cancle{
  margin: 0 40rpx;
  padding: 30rpx 0;
}
.zoom-cancle span:nth-child(1){
  background: #FFB3BF;
  color:#333;
  font-size: 26rpx;
  padding: 4rpx;
  border-radius: 8rpx;
}
.zoom-cancle span:nth-child(2){
  font-size: 26rpx;
  color:#666;
  margin-left: 30rpx;
}
.zoom-footer{
  display: flex;
  justify-content: space-between;
  padding:0 30rpx;
  margin: 10rpx 0;
  box-sizing: border-box
}
.zoom-footer p{
  flex:1;
}
.zoom-footer p>span:nth-child(1){
  font-size: 30rpx;
  color:#000;
}
.zoom-footer p>span:nth-child(2){
  font-size: 32rpx;
   color:#FF2d50;
}

</style>
