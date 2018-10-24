<template>
  <div class="hotel-detailall">
   <swiper :indicator-dots="false" :autoplay="true" :interval="3000" style="position:relative;height:70vw" @change="swiprerChange" @click="goAblums()">
   <block v-for="(item,index) in detailInfo.Albums" :key="index">
    <swiper-item>
      <image :src="item.PicPath" class="slide-image" style="width:100vw;height:70vw"/>
    </swiper-item>
  </block>
 </swiper>

 <span class="index">{{current+1}}/{{AlbumsLength}}</span>
    <div class="desc"><span>{{detailInfo.Hotel.Name}}</span></div>
    <div class="line"></div>
   <!--简介设施开始-->
   <div class="facilities">
   <p class="title" @click="goFacilities()"><span>设施简介</span> <i class="fa fa-angle-right" style="color:#999;font-size:16px;"></i></p>
      <ul class="facilities-list">
        <li class="fa-item" v-for="(item,index) in detailInfo.ConfigList" :key="index" v-if="index<=4"><img :src="item.Expand" style="width:40rpx;height:40rpx"><span>{{item.Value}}</span></li>
      </ul>
      <div class="line" style="width:100%;margin:0 auto"></div>
   </div>
   <!--简介设施结束-->
    <div class="map">
      <p class="title" @click="navigation"><span>地图周边</span><i class="fa fa-angle-right" style="color:#999;font-size:16px;"></i></p>
      <div class="address"><i class="fa fa-map-marker" style="margin-right:5px;font-size:36rpx"></i><span>{{detailInfo.Hotel.AddressSSQ}}</span></div>
   </div>
   <div class="date-picker">
     <a :href="'/pages/datePicker/main?hotelId='+detailInfo.Hotel.Id+'&dateType=1'">
      <div class="date">
         <span>入住</span>
         <span>{{ruzhuDate}}</span>
      </div>
      </a>
   
      <div class="time">
          <span>{{totalNights}}晚</span>
      </div>
      
   <a :href="'/pages/datePicker/main?hotelId='+detailInfo.Hotel.Id+'&dateType=2'">
        <div class="date">
          <span>离店</span>
          <span>{{leaveDate}}</span>
        </div>
       </a>
   </div>
  <HotelDatePicker></HotelDatePicker>

   <ul class="hotel-list">
     <li class="hotel" v-for="(item,index) in detailInfo.GuestRoomType" :key="index">
       <div class="up-hotel">
       <img class="img-hotel"  :src="item.GuestRoomType.PicPath"/>
       <div class="hotel-detail" @click="item.down=!item.down">
          <P>{{item.GuestRoomType.NameCode}}</P>
          <p><span >{{item.GuestRoomType.AreaRange}}m</span><sub style="font-size:20rpx">2</sub><span style="margin-left:20rpx">{{item.GuestRoomType.BedType_Name}}</span></p>
       </div>
       <div class="price" @click="item.down=!item.down">
         <span>￥</span>
         <span>{{item.GuestRoomType.MinPrice}}</span>
         <span>起</span>
       </div>
       <div class="up" @click="item.down=!item.down"><i class="fa" :class="{'fa-angle-down':item.down,'fa-angle-up':!item.down}" style="color:#999;font-size:14px"></i></div>
       </div>
       <!-- 支付预定-->
       <div   class="down" :class="{show:item.down}">
       <div v-show="item.down"> 
          <div class="linePay"  v-for="(item1,index1) in item.GuestRooms" :key="index1">
            <div class="pay-left"  @click="subcridZoom(index,index1,1)">
              <p><span>{{item1.BreakfastInfo_Name}} {{item1.BedType_Name}}</span> <i class="fa fa-angle-right"></i></p>
              <p v-if="item1.Payway=='GPAZXF0001'">不可取消</p>
              <p v-if="item1.Payway=='GPADDF0001'">免费取消</p>
            </div>
            <div class="pay-right">
              <p class="price" style="line-height:1.5"> <span>￥</span><span style="font-size:26rpx;">{{item1.WxPrice}}</span></p>
              <div class="sucrib"><img :src="btn1" alt="" v-if="item1.Payway=='GPAZXF0001'&&!item1.WxIsFull"  @click="subcridZoom(index,index1)"><img :src="btn2" alt="" v-if="item1.Payway=='GPADDF0001'&&!item1.WxIsFull" @click="subcridZoom(index,index1)"><span v-if="item1.WxIsFull" style="font-size:30rpx;color:#999;background:#eee">满房</span></div>
            </div>
          </div>
       </div>
       </div>
     </li>
   </ul>
  <div class="notice" v-if="detailInfo.Hotel.IsInOut||detailInfo.Hotel.IsChildPolicy||detailInfo.Hotel.IsDietaryArrangements||detailInfo.Hotel.IsHotelTips||detailInfo.Hotel.IsNotPets">
    <p class="notice-title"  @click="noticeDetail=true"><span>入住须知</span><i class="fa fa-angle-right" style="color:#999;font-size:16px;"></i></p>
    <div class="line" style="width:100%;margin:0 auto"></div>
   <div class="notice-content" style="margin-left:40rpx">
      <p class="content-title" v-if="detailInfo.Hotel.IsInOut">入住和离店</p>
      <p class="content-detail" v-if="detailInfo.Hotel.IsInOut"><span>入住时间{{detailInfo.Hotel.CheckinTime}}以后</span><span>离店时间：{{detailInfo.Hotel.DepartureTime}}以前</span></p>
      <p class="content-title" v-if="detailInfo.Hotel.IsChildPolicy">儿童政策</p>
      <p class="content-detail" v-if="detailInfo.Hotel.IsChildPolicy"><span>不接受18岁以下客人单独入住</span></p>
    </div>
  </div>
  <div class="notice-detail" :class="{show:noticeDetail}">
  <div  v-if="noticeDetail">
     <p class="detail-title">入住须知</p>
     <div class="notice-content" style="margin-left:40rpx">
      <p class="content-title" v-if="detailInfo.Hotel.IsInOut">入住和离店</p>
      <p class="content-detail" v-if="detailInfo.Hotel.IsInOut"><span>入住时间{{detailInfo.Hotel.CheckinTime}}以后</span><span>离店时间：{{detailInfo.Hotel.DepartureTime}}以前</span></p>
      <p class="content-title" v-if="detailInfo.Hotel.IsChildPolicy">儿童政策</p>
      <p class="content-detail" v-if="detailInfo.Hotel.IsChildPolicy"><span>不接受18岁以下客人单独入住</span></p>
      <p class="content-title" v-if="detailInfo.Hotel.IsDietaryArrangements">膳食安排</p>
      <p class="content-detail" v-if="detailInfo.Hotel.IsDietaryArrangements"><span>{{detailInfo.Hotel.DietaryArrangements}}</span></p>
      <p class="content-title" v-if="detailInfo.Hotel.IsHotelTips">酒店提示</p>
      <p class="content-detail" v-if="detailInfo.Hotel.IsHotelTips"><span>{{detailInfo.Hotel.HotelTips}}</span></p>
      <p class="content-title" v-if="detailInfo.Hotel.IsNotPets">宠物</p>
      <p class="content-detail" v-if="detailInfo.Hotel.IsNotPets"><span>不可携带宠物</span></p>
    </div>
      <p class="close"><i class="fa fa-close" @click="noticeDetail=false"></i></p>
  </div>
  </div>

  <!--房间详情开始-->
<div class="detail" :class="{show:zoomDetail}">
  <div class="zoom-detail" v-if="zoomDetail"  >
     <div class="zoom-wrap">
       <div class="zoom-title"><p><span class="bz">{{currZoomDetail.GuestRoomType.NameCode}}</span><span class="zc">{{currZoomtypeDetail.BreakfastInfo_Name}}早餐</span></p><i class="fa fa-times-circle-o" style="color:#999;font-size:35rpx;" @click="zoomDetail=false"></i></div>
       <div class="zoom-main">
         <ul class="base">
           <li class="base-item"><span>面积：</span><span>{{currZoomtypeDetail.Area}}m2</span></li>
           <li  class="base-item"><span>可住：</span><span>{{currZoomtypeDetail.PersonNum}}人</span></li>
           <li  class="base-item"><span>床型：</span><span>{{currZoomtypeDetail.BedType_Name}}</span></li>
           <li  class="base-item"><span>便利设施：</span><span>{{currZoomtypeDetail.WindowInfo_Name}}</span></li>
           <li  class="base-item"><span>楼层：</span><span>{{currZoomtypeDetail.FloorRange}}层</span></li>
         </ul>
         <div class="zoom-facity">
           <p class="zoom-fac-title"><span>房间设施</span><i class="fa fa-angle-right" style="font-size:40rpx;color:#666"></i></p>
           <p class="zoom-desc">
             <span v-for="(item,index) in currZoomDetail.ConfigList" :key="index" style="margin-right:30rpx">{{item.Value}}</span>
           </p>
         </div>
         <div class="line"></div>
         <div class="zoom-cancle" v-if="currZoomtypeDetail.Payway_Name=='GPADDF0001'"><span>免费取消</span><span>订单提交后随时可以取消，不收取任何费用</span></div>
          <div class="zoom-cancle" v-if="currZoomtypeDetail.Payway=='GPAZXF0001'"><span>不可取消</span><span>订单一旦生成，不可取消！</span></div>
       </div>
       <div class="line"></div>
       <div class="zoom-footer">  
         <p><span>合计:</span><span>￥{{totalPrice}}</span></p>
          <button @click="planeOrder()">立即预订</button>
       </div>
     </div>
  </div>
</div>
  <!--房间详情结束-->
  </div>
</template>

<script>
import btn1 from '@/asset/images/Reserve_btn@2x.png'
import btn2 from '@/asset/images/Reserve_btn01@2x.png'
import {queryHotelDetail, getRoomCalendarList} from '@/utils/api'
import {formatTime} from '@/utils/index'
export default {
  data () {
    return {
      btn1,
      btn2,
      noticeDetail: false,
      zoomDetail: false,
      currZoomDetail: '',
      currZoomtypeDetail: '',
      down: false,
      current: 0,
      ruzhuDate: '',
      leaveDate: '',
      priceList: [],
      priceQuery: {
        roomId: 0,
        dateBegin: formatTime(new Date()),
        dateEnd: formatTime(new Date(new Date().valueOf() + 24 * 60 * 60 * 1000))
      },
      AlbumsLength: 0,
      ruzhumDays: [],
      leavemDays: [],
      detailInfo: {
        Hotel: {}
      },
      queryParams: {
        hotelId: '',
        dateTime: ''
      }
    }
  },
  computed: {
    totalNights () {
      let ruzhuDate = this.ruzhuDate.replace(/-/g, '/')
      let leaveDate = this.leaveDate.replace(/-/g, '/')
      let checkintime = new Date(ruzhuDate).getTime()
      let checkouttime = new Date(leaveDate).getTime()
      let nights = Math.floor((checkouttime - checkintime) / 1000 / 24 / 60 / 60)
      if (isNaN(nights)) {
        return 1
      } else {
        return nights
      }
    },
    totalPrice () {
      let price = 0
      this.priceList.forEach((item, index) => {
        if (index < this.priceList.length - 1) {
          price += item.Price
        }
      })
      return price.toFixed(2)
    }
  },
  methods: {
    initData () {
      this.noticeDetail = false
      this.zoomDetail = false
      this.currZoomDetail = {}
      this.currZoomtypeDetail = {}
      this.current = 0
      this.AlbumsLength = 0
      this.ruzhumDays = []
      this.leavemDays = []
    },
    swiprerChange (e) {
      this.current = e.target.current
    },
    goAblums () {
      let Ablums = JSON.stringify(this.detailInfo.Albums)
      let AblumsTypes = JSON.stringify(this.detailInfo.TypeAlbums)
      wx.navigateTo({url: `../../pages/hotelAlbums/main?Ablums=${Ablums}&AblumsTypes=${AblumsTypes}`})
    },
    navigation () {
      wx.getLocation({// 获取当前经纬度
        type: 'wgs84', // 返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息
        success: (res) => {
          wx.openLocation({
            latitude: this.detailInfo.Hotel.Coordinates[1] * 1, // 要去的纬度-地址
            longitude: this.detailInfo.Hotel.Coordinates[0] * 1, // 要去的经度-地址
            name: this.detailInfo.Hotel.Name,
            address: this.detailInfo.Hotel.AddressSSQ
          })
        }
      })
    },
    isLeap (year) {
      let res = (year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : (year % 4 === 0 ? 1 : 0))
      return res
    },
    // 获取默认入住和离店的时间
    setDate () {
      let date = new Date()
      this.ruzhuDate = this.$root.$mp.query.dateBegin ? this.$root.$mp.query.dateBegin : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      this.queryParams.dateTime = this.ruzhuDate
      this.ruzhumDays = [31, 28 + this.isLeap(date.getFullYear()), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      if (date.getMonth() === 11 && date.getDate() === 31) {
        this.leaveDate = this.$root.$mp.query.dateEnd ? this.$root.$mp.query.dateEnd : `${date.getFullYear() + 1}-01-01`
      } else if (date.getMonth() < 11 && date.getDate() === this.ruzhumDays[date.getMonth()]) {
        this.leaveDate = this.$root.$mp.query.dateEnd ? this.$root.$mp.query.dateEnd : `${date.getFullYear()}-${date.getMonth() + 2}-01`
      } else {
        this.leaveDate = this.$root.$mp.query.dateEnd ? this.$root.$mp.query.dateEnd : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`
      }
      this.priceQuery.dateBegin = this.ruzhuDate
      this.priceQuery.dateEnd = this.leaveDate
    },
    getHotelDetail () {
      queryHotelDetail(this.queryParams).then(res => {
        if (res.Code === 200) {
          let data = res.Data
          data.Hotel.Coordinates = data.Hotel.Coordinates.split(',')
          data.GuestRoomType.forEach(element => {
            element.down = false
          })
          this.detailInfo = data
          this.AlbumsLength = this.detailInfo.Albums.length
        }
      })
    },
    /**
     * 房间预定
     */
    subcridZoom (index, index1, type) {
      if (type) {
        this.zoomDetail = true
      }
      this.currZoomDetail = this.detailInfo.GuestRoomType[index]
      this.currZoomtypeDetail = this.detailInfo.GuestRoomType[index].GuestRooms[index1]
      this.priceQuery.roomId = this.currZoomtypeDetail.Id
      this.getPriceList(type)
    },
    /**
     *下单
     */
    planeOrder () {
      let currZoomDetail = JSON.stringify(this.currZoomDetail)
      let currZoomtypeDetail = this.currZoomtypeDetail
      currZoomtypeDetail.hotelName = this.detailInfo.Hotel.Name
      currZoomtypeDetail.TotalPrice = this.totalPrice
      currZoomtypeDetail = JSON.stringify(currZoomtypeDetail)

      wx.navigateTo({ url: `../../pages/planeOrder/main?currZoomDetail=${currZoomDetail}&currZoomtypeDetail=${currZoomtypeDetail}&checkin=${this.ruzhuDate}&checkout=${this.leaveDate}&days=${this.totalNights}` })
    },
    goFacilities () {
      let configTree = JSON.stringify(this.detailInfo.ConfigTree)
      let intro = this.detailInfo.Hotel.Introduction
      let tel = this.detailInfo.Hotel.PhoneNumber
      wx.navigateTo({ url: `../../pages/introFacilities/main?configTree=${configTree}&intro=${intro}&tel=${tel}` })
    },
    /**
     *获取价格详情
     */
    getPriceList (type) {
      getRoomCalendarList(this.priceQuery).then(res => {
        if (res.Code === 200) {
          this.priceList = res.Data
          if (!type) {
            this.planeOrder()
          }
        }
      })
    }
  },
  onShow () {
    this.initData()
    this.queryParams.hotelId = this.$root.$mp.query.hotelId
    this.queryParams.dateTime = this.$root.$mp.query.dateBegin

    let currTime = new Date(formatTime(new Date())).getTime()
    if (wx.getStorageSync('dateType')) {
      switch (wx.getStorageSync('dateType')) {
        case '1':
          this.ruzhuDate = wx.getStorageSync('date')
          let time1 = new Date(this.ruzhuDate.replace(/-/g, '/')).getTime()
          let time2 = new Date(this.leaveDate.replace(/-/g, '/')).getTime()
          if (time1 < currTime) {
            wx.showToast({
              title: '入住时间不能小于当前日期', // 提示的内容,
              icon: 'none', // 图标,
              duration: 2000, // 延迟时间,
              mask: true, // 显示透明蒙层，防止触摸穿透,
              success: res => {}
            })
          } else {
            if (time1 >= time2) {
              time2 = time1 + 24 * 60 * 60 * 1000
              this.leaveDate = new Date(time2).getFullYear() + '-' + (new Date(time2).getMonth() + 1) + '-' + new Date(time2).getDate()
            }

            this.queryParams.dateTime = this.ruzhuDate
            this.priceQuery.dateBegin = this.ruzhuDate
            this.priceQuery.dateEnd = this.leaveDate
            this.getPriceList(1)
          }
          break
        case '2':
          this.leaveDate = wx.getStorageSync('date')
          let time4 = new Date(this.ruzhuDate.replace(/-/g, '/')).getTime()
          let time3 = new Date(this.leaveDate.replace(/-/g, '/')).getTime()
          if (time3 <= time4) {
            time4 = time3 - 24 * 60 * 60 * 1000
          }
          if (time4 < currTime) {
            wx.showToast({
              title: '入住时间不能小于当前日期', // 提示的内容,
              icon: 'none', // 图标,
              duration: 2000, // 延迟时间,
              mask: true, // 显示透明蒙层，防止触摸穿透,
              success: res => {}
            })
          } else {
            this.ruzhuDate = new Date(time4).getFullYear() + '-' + (new Date(time4).getMonth() + 1) + '-' + new Date(time4).getDate()
            this.queryParams.dateTime = this.ruzhuDate
            this.priceQuery.dateBegin = this.ruzhuDate
            this.priceQuery.dateEnd = this.leaveDate
            this.getPriceList(2)
          }

          break
      }
      wx.removeStorageSync('date')
      wx.removeStorageSync('dateType')
    } else {
      this.setDate()
    }
    this.getHotelDetail()
  }
}
</script>

<style scope>

.fade-transition {
        transition: all .5s ease;
        opacity: 1;
    }
    .fade-enter,
    .fade-leave {
        opacity: 0;
}
page{
  background: #eee;
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
  position: absolute;
  left: 0;
  top:0;
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
button {
background: #FF2d50;
color: #fff;
font-size: 30rpx;
margin-right: 60rpx;
border-radius: 30rpx;
}
.page{
  background:#fefefe;
}
.img{
  width:100vw;
  height: 400rpx;
  background-size: cover;
}
.desc{
  background: #fff;
  width: 100vw;
  display: flex;
  padding: 30rpx;
  box-sizing: border-box;
  justify-content: space-between;

}
.desc span:nth-child(1){

  font-size: 30rpx;
  color:#333;
  flex:1;
}
.desc span:nth-child(2){
  
  background: #ffe5ea;
  color:#FFB3BF;
  padding:5rpx 10rpx;
  font-size: 22rpx;
  border-radius: 6rpx;
}
.line{
  width:100%;
  height: 2px;
  background:  #ccc;
  transform: scaleY(0.2);
}
.facilities,.notice{
  margin-top: 5px;
  background: #fff;
  padding: 30rpx;
  box-sizing: border-box;
}
.title{
  font-size: 28rpx;
  color:#666;
  margin-bottom: 5rpx;
  display: flex;
  justify-content: space-between;
}
.facilities-list{
  display: flex;
 
}
.fa-item{
  align-items: center;
  justify-content: flex-start;
  color:#999;
  font-size:24rpx;
  display: flex;
  flex-direction: column;
  margin:20rpx;
  text-align: center;
}
.fa-item i{
  font-size: 40rpx;
}
.map{
  background: #fff;
  padding:0 30rpx 30rpx 30rpx;
  box-sizing: border-box;
  margin-bottom: 10rpx;
  box-sizing: border-box;
}
.address{
  font-size: 28rpx;
  color: #999;
  margin-top: 20rpx;
}
.date-picker{
  background: #fff;
  padding: 30rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
.date{
  flex:1;
  display: flex;
  flex-direction: column;
  align-items: center;
  color:#666;
}
.date>span:nth-child(1){
  color:#666;
  font-size:24rpx;

}
.date>span:nth-child(2){
  font-size: 26rpx;
  color:red;
}
.time{
  font-size: 26rpx;
  color:#333;
}
.hotel-list{
  margin-top:10rpx;
 
}
.hotel .up-hotel{
  display: flex;
  justify-content:flex-start;
  background: #fff;
  margin-top:10rpx;
  padding:10rpx  30rpx;
  box-sizing: border-box;
}
.img-hotel{
  width: 150rpx;
  height: 150rpx;
  background-size: cover;
  border-radius: 30rpx;
}
.hotel-detail{
  flex:1;
  margin-left:20rpx;
}
.hotel-detail>p:nth-child(1){
  font-size: 28rpx;
  color:#333;
  margin-top: 20rpx;
}
.hotel-detail>p:nth-child(2){
  color:#999;
  font-size: 26rpx;
  margin-right: 40rpx;
  display: flex;
  margin-top:20rpx;
}
.price{
  margin: 0 10rpx;
  line-height: 150rpx;
}
.price>span:nth-child(2n+1){
  font-size: 22rpx;
  color:#333;
}
.price>span:nth-child(2n){
  font-size: 32rpx;
  color: red;
}
.up{
  line-height: 150rpx;
}
.notice-title{
  font-size: 28rpx;
  margin-bottom: 30rpx;
  display: flex;
  justify-content: space-between
  
}
.content-title{
  line-height: 2;
  font-size: 28rpx;
  color:#333;
}
.content-detail{
font-size:26rpx;
color:#666;
}
.content-detail>span{
  margin-right: 40rpx;
}
.index{
  position: absolute;
  z-index: 9999999;
  right: 0;
  top: 60vw;
  color:#fff;
  background: rgba(0,0,0,0.5);
  font-size: 28rpx;
  display:block;
  height: 10vw;
  line-height: 10vw;
  text-align: right;
  width:100vw;
  padding-right: 5vw;
}
.slide-image{
width: 100vw;
}
.navigator-hover {
background-color:rgba(0, 0, 0, 0);

}
.notice-detail{
  position: fixed;
  top:0;
  bottom: 0;
  height: 100%;
  z-index: 9999999;
  background: #FFF;
  width: 100vw;
  box-sizing: border-box;
  transform: translateX(100%);
  transition: all 0.3s ;
}
.notice-detail.show{
  transform: translateX(0)
}
.detail-title{
  font-size: 30rpx;
  color:#333;
  margin: 10% 0 30rpx 0 ;
  text-align: center;
}
.notice-content p{
  line-height: 2;
}
.close{
  background: #fff;
  font-size: 40rpx;
  color:#666;
  position: absolute;
  left: 50%;
  bottom: 5%;
}
.down{
  transform: translateY(100%);
  transition: all 0.5s;
}
.down.show{
   transform: translateY(0);
}
.linePay{
display: flex;
justify-content: space-between;
border-bottom: 2rpx solid #ccc;
padding: 30rpx;
}
.linePay:last-child{
  border-bottom: none;
}
.pay-left{
  flex:1
}
.pay-left p:nth-child(1){
font-size: 26rpx;
color:#333;
}
.pay-left p:nth-child(2){
  font-size: 24rpx;
  color:#999;
}
.pay-left p:nth-child(1)>i{
  font-size: 30rpx;
  margin-left: 30rpx;
  color:#666;
}
.pay-right{
display: flex;
align-items: center;
}

.sucrib img{
  width:107rpx;
  height: 76rpx;
}
.fade-enter-active,.fade-leave-active {
    transition: all 1s linear;
}
.fade-enter,.fade-leave-active {
   opacity: 0;
   transform:translateX(50px);
}

</style>
