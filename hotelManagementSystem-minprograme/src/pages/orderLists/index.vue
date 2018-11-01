<template>
  <div class="orderlist-warp">
  <ul class="headerbar">
       <li v-for="(bar,index) in headerBars" :key="index" :class="{'active':index==currIndex}" @click="select(index)">{{bar.name}}</li>
  </ul>
  <swiper :indicator-dots="false"
  :autoplay="false"  @change="swiperChange($event)" :scroll-top="scrollTop">
  <block  v-for="(bar,index) in headerBars" :key="index">
    <swiper-item>
    <scroll-view scroll-y style="height: 100vh;" @scrolltolower="getList()">
      <ul class="order-lists"  v-if="currIndex!=1">
        <p  v-show="!list.length" style="text-align:center;color:#666;font-size:30rpx">暂无相关订单!</p>
          <li :class="{'complete':item.OrderStatus=='OSAYWC0001'}" v-for="(item,index1) in list" :key="index1">
            <p class="title"><span class="name" :class="{'gay':item.OrderStatus=='OSAYWC0001'}">{{item.HotelName}}</span><span >实付款 ￥</span><i class="red">{{item.ActPrice}}</i></p>
            <p class="detail"><span>{{item.GuestRoomTypeName}}</span></p>
            <p class="detail"><span>入住{{item.CheckinTime}}</span><span>离店{{item.CheckoutTime}}</span><span>{{item.totalNights}}晚</span></p>
            <div class="line"></div>
            <p class="order-footer">
               <span  class="redbtn" v-if="item.OrderStatus==OrderStatus.paying||item.OrderStatus==OrderStatus.checkining"  @click="cancle(item)">取消</span>
              <span  class="redbtn" v-if="item.OrderStatus==OrderStatus.paying"  @click="goPay(item)">去支付</span>
              <span  class="redbtn" v-if="item.OrderStatus!=OrderStatus.paying">{{item.OrderStatus_Name}}</span>
              <span class="redbtn" @click="viewDetail(item)">查看详情</span></p>
          </li>
        </ul>
     <ul class="order-lists"  v-if="currIndex==1">
        <p  v-show="!list.length" style="text-align:center;color:#666;font-size:30rpx">暂无相关订单!</p>
          <li :class="{'complete':item.OrderStatus=='OSAYWC0001'}" v-for="(item,index1) in list" :key="index1" v-if="item.OrderStatus==OrderStatus.checkining||item.OrderStatus==OrderStatus.paying">
            <p class="title"><span class="name" :class="{'gay':item.OrderStatus=='OSAYWC0001'}">{{item.HotelName}}</span><span >实付款 ￥</span><i class="red">{{item.ActPrice}}</i></p>
            <p class="detail"><span>{{item.GuestRoomTypeName}}</span></p>
            <p class="detail"><span>入住{{item.CheckinTime}}</span><span>离店{{item.CheckoutTime}}</span><span>{{item.totalNights}}晚</span></p>
            <div class="line"></div>
            <p class="order-footer">
               <span  class="redbtn" v-if="item.OrderStatus==OrderStatus.paying||item.OrderStatus==OrderStatus.checkining" @click="cancle(item)">取消</span>
              <span  class="redbtn" v-if="item.OrderStatus==OrderStatus.paying" @click="goPay(item)">去支付</span>
              <span  class="redbtn" v-if="item.OrderStatus!=OrderStatus.paying">{{item.OrderStatus_Name}}</span>
              <span class="redbtn" @click="viewDetail(item)">查看详情</span></p>
          </li>
        </ul>
          <p  v-show="maxPage<queryParams.pageIndex&&list.length>0" style="text-align:center;color:#666;font-size:30rpx">暂无更多数据!</p>
        </scroll-view>
    </swiper-item>
  </block>
</swiper>
   
  </div>
</template>

<script>
import {getOrderList, cancelOrder} from '@/utils/api'
export default {
  data () {
    return {
      OrderStatus: {
        paying: 'OSADZF0001', // 待支付
        checkining: 'OSADRZ0001', // 待入住
        confirmed: 'OSAYQR0001', // 已确认
        cancled: 'OSAYQX0001', // 已取消
        compoleted: 'OSAYWC0001'// 已完成

      },
      list: [],
      scrollTop: 0,
      currIndex: 0,
      headerBars: [{name: '全部订单', status: ''}, {name: '进行中', status: ''}, {name: '已完成', status: 'OSAYWC0001'}, {name: '已取消', status: 'OSAYQX0001'}],
      maxPage: 1,
      queryParams: {
        status: '',
        pageIndex: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    swiperChange (e) {
      this.currIndex = e.target.current
      this.scrollTop = 0
      this.list = []
      this.maxPage = 1
      this.queryParams.pageIndex = 1
      this.queryParams.status = this.headerBars[this.currIndex].status
      this.getList()
    },
    getList () {
      if (this.queryParams.pageIndex <= this.maxPage) {
        getOrderList(this.queryParams).then(res => {
          if (res.Code === 200) {
            this.list = this.list.concat(this.formData(res.Data.List))
            this.maxPage = Math.ceil(res.Data.Count / this.queryParams.pageSize)
            this.queryParams.pageIndex++
          }
        })
      }
    },
    select (index) {
      this.currIndex = index
      this.list = []
      this.maxPage = 1
      this.queryParams.pageIndex = 1
      this.queryParams.status = this.headerBars[this.currIndex].status

      this.getList()
    },
    /**
     * 数据格式化
     */
    formData (list) {
      list.forEach(item => {
        item.CheckinTime = item.CheckinTime.split('T')[0]
        item.CheckoutTime = item.CheckoutTime.split('T')[0]
        let reserveTime = new Date(item.ReserveTime)
        item.ReserveTime = `${reserveTime.getFullYear()}-${reserveTime.getMonth() + 1}-${reserveTime.getDate()}  ${reserveTime.getHours()}:${reserveTime.getMinutes()}:${reserveTime.getSeconds()}`
        let checkin = item.CheckinTime.replace(/-/g, '/')
        let checkout = item.CheckoutTime.replace(/-/g, '/')
        let time1 = new Date(checkin).getTime()
        let time2 = new Date(checkout).getTime()
        item.totalNights = Math.ceil(time2 - time1) / 1000 / 24 / 60 / 60
      })
      return list
    },
    /**
     *日期格式话
     */
    formDate (data) {
      let date = new Date(data)
      let string = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      return string
    },
    /**
     *查看详情
     */
    viewDetail (detail) {
      let orderDetail = JSON.stringify(detail)
      wx.navigateTo({ url: `../../pages/orderDetail/main?orderDetail=${orderDetail}` })
    },
    /**
     *去支付
     */
    goPay (order) {
      let orderDetail = {}
      orderDetail.Name = order.HotelName
      orderDetail.tel = order.Phone
      orderDetail.user = order.GuestName
      orderDetail.checkin = order.CheckinTime
      orderDetail.checkout = order.CheckoutTime
      orderDetail.totalPrice = order.ActPrice
      orderDetail.totalNight = order.totalNights
      orderDetail.orderId = order.Id
      orderDetail = JSON.stringify(orderDetail)
      wx.navigateTo({ url: `../../pages/paySelect/main?zoomTypeDetail=${orderDetail}` })
    },
    /**
     *取消订单
     */
    cancle (order) {
      wx.showModal({
        title: '提示', // 提示的标题,
        content: '确定要取消订单吗', // 提示的内容,
        showCancel: true, // 是否显示取消按钮,
        cancelText: '取消', // 取消按钮的文字，默认为取消，最多 4 个字符,
        cancelColor: '#000000', // 取消按钮的文字颜色,
        confirmText: '确定', // 确定按钮的文字，默认为取消，最多 4 个字符,
        confirmColor: '#3CC51F', // 确定按钮的文字颜色,
        success: res => {
          if (res.cancel) {
          } else if (res.confirm) {
            cancelOrder(order.Id).then(res => {
              if (res.Code === 200) {
                wx.showToast({
                  title: '取消成功', // 提示的内容,
                  icon: 'success', // 图标,
                  duration: 2000, // 延迟时间,
                  mask: true, // 显示透明蒙层，防止触摸穿透,
                  success: res => {
                    this.list = []
                    this.maxPage = 1
                    this.queryParams.pageIndex = 1
                    this.queryParams.pageSize = 10
                    this.getList()
                  }
                })
              }
            })
          }
        }
      })
    }
  },
  onLoad () {
    this.currIndex = this.$root.$mp.query.currIndex ? this.$root.$mp.query.currIndex : 0
    this.queryParams.status = this.headerBars[this.currIndex].status
    this.maxPage = 1
    this.queryParams.pageIndex = 1
    this.queryParams.pageSize = 10
    this.list = []
    this.getList()
  }
}
</script>
<style scope>
page{
  background: #eee;
}

navigator {

display:inline;
}
.navigator-hover {
background-color:transparent;
}
swiper{
height: 100vh;
overflow:scroll;
}
.headerbar{
  width:100vw;
  height: 5vh;
  background: #fff;
  position: fixed;
  left:0;
  top:0;
  z-index:999;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #eee;
}
.headerbar li{
  flex:1;
  height: 5vh;
  line-height: 5vh;
  font-size: 32rpx;
  text-align: center;
}
.headerbar li.active{
  color:#ff2d50;
}
p{
  margin-bottom: 10px;
}
.red{
    color:#ff2d50;
}
.redbtn{
  color:#333;
  background:#ffecef;
  border-radius: 40rpx;
  display: inline-block;
  width:140rpx;
  height: 40rpx;
  line-height: 40rpx;
  text-align: center;
}
.order-lists{
  margin-top: 80rpx;
}
.order-lists li{
background: #fff;
padding: 30rpx;
box-sizing: border-box;
margin-bottom: 30rpx;
}
.title{

  display: flex;
  justify-content: space-between;
}
.title span,.title i{
  font-size: 28rpx;
  font-weight: bold;
}
.name{
  flex:1;
   font-size: 32rpx !important;
}
.line{
  width:100%;
  height: 2px;
  background:  #ccc;
  transform: scaleY(0.2);
}
.detail span{
font-size: 28rpx;
color:#666;
margin-right: 30rpx;
}
.order-footer{
  text-align: right;
  font-size: 30rpx;
  margin-top:30rpx;
}
.order-footer span{
  margin-left: 30rpx;
}
.gay{
  color:#999;
}
</style>
