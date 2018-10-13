<template>
   <Layout>
        <Header  class="headerbar">
            <headrbar></headrbar>
        </Header>
<Content>
  <div class="subscribe-app">
 <div class="left">
   <p class="title">预订信息</p>
 <i-form>
           <Row>
                <i-col span="8">
                    <Form-item prop="date" label="入离日期" class="date-item">
                        <Date-picker type="date" placeholder="选择日期" v-model="calendarListQuery.dateBegin" @on-change="startTimeChange($event)" :options="startTimeOptions"></Date-picker>
                    </Form-item>
                </i-col>
                <i-col span="8">
                    <Form-item prop="time" label="到"  class="date-item">
                     <Date-picker type="date" placeholder="选择日期" v-model="calendarListQuery.dateEnd"  @on-change="endTimeChange($event)" :options="endTimeOptions"></Date-picker>
                    </Form-item>
                </i-col>
            </Row>
           </i-form>
   <div class="item"><span class="label">房间数量：</span><Icon type="md-remove-circle" class="remove" @click="decreasNum()"/><span class="num">{{orderParams.RoomNum}}</span><Icon type="md-add-circle"  class="add" @click="orderParams.RoomNum+=1"/></div>
   <div class="item"><span class="label">房费总计：</span><span class="price">￥{{totalPrice}}</span>
   <Poptip placement="right" width="400" trigger="hover" style="overflow-y:scrool">
   <span style="font-size:14px;color:#999">明细</span>
     <div class="api" slot="content" style=" max-height: 400px; overflow-y:scroll;">
            <ul class="detail-order" >
                <li v-for="(item,index) in priceList" :key="index" v-if="index<priceList.length-1"><span>{{item.DateIndex}}</span><span v-if="item.IsFull">满房</span><span v-if="!item.IsFull">￥{{item.Price}}*{{orderParams.RoomNum}}间</span></li>
            </ul>
            <div class="detail-total">房间费总计：￥{{totalPrice}}</div>
        </div>
   </Poptip>
   </div>
    <p class="title">入住信息</p>
    <div class="item">
        <span class="label">住客信息:</span>
        <Input v-model="orderParams.GuestName" placeholder="请输入住客姓名" clearable style="width: 200px" />
         <Poptip placement="right" width="400"  v-model="api1">
       <span style="font-size:14px;color:#999;margin-left:10px">选择</span>
        <div class="api1" slot="content">
                     <ul class="userinfo-list">
                         <li v-for="(item,index) in travelList" :key="index" @click="getUser(item)">
                             <div>
                                 <p>{{item.Name}}</p>
                                 <p>电话号码：{{item.Mobile}}</p>
                             </div>
                             <input type="radio" v-model="userinfo" name="user" :checked="true" :value="item.Name">
                         </li>

                     </ul>
            </div>
      </Poptip>
        <span style="font-size:12px;color:#999;margin-left:10px">(所填写姓名需与入住时所持证件一致)</span>
    </div>
     <div class="item">
        <span class="label">电话号码:</span><Input v-model="orderParams.Phone" placeholder="请输入电话号码" clearable style="width: 200px" />
    </div>
    <p class="title">发票信息</p>
    <div class="item"><span style="color:#666;font-size:14px;">如需房费发票，请从酒店前台索取</span></div>
    <p class="title">预订须知</p>
     <div class="item"><span style="color:#666;font-size:14px;">预订成功后不可取消，预订保留当天最晚18:00，入住人需凭有效证件入住。</span></div>
     <div style="margin:40px 0;"><Button type="warning" style="width:200px;margin-left:100px;font-size:16px"   v-if="disabledSave" loading>loading</Button><Button type="warning" style="width:200px;margin-left:100px;font-size:16px" @click="addOrder()"  v-if="!disabledSave">提交订单</Button></div>
   </div>
   <div class="right">
       <div class="image"><img :src="hold" alt=""></div>
       <div style="width:280px;padding:20px">
       <div  style="color:#333;font-size:15px;font-weight:500">{{bedInfo.hotelName}}</div>
       <div class="address">地址：{{bedInfo.address}}</div>
       <div class="address" style="margin-bottom:30px">电话：{{bedInfo.hotelPhone}}</div>
       <div  class="address" >房型：{{bedInfo.guestRoomTypeName}}</div>
       <div  class="address" style="display:flex;justify-content: space-between;"><span>床型：{{bedInfo.bedName}}</span><span>面积：{{bedInfo.zoomArea}}m<sup>2</sup></span></div>
       <div  class="address"  style="display:flex;justify-content: space-between;"><span>楼层：{{bedInfo.floorRange}}</span><span>早餐：{{bedInfo.breakfastInfoName}}</span></div>
       <div  class="address">房费：￥{{totalPrice}}</div>
       <div  class="address" v-if="voucherState">抵用券：￥{{voucher.OffsetMoney}}<Checkbox v-model="voucherUse" class="voucherUse" style="margin-left:10px" @on-change="selectDiscount()"  v-if="voucher.OffsetMoney*1>0"/></div>
       <div  style="color:#333;font-size:15px;font-weight:500;margin-top:20px;">订单总额：￥{{orderParams.ActPrice}}</div>
       </div>
   </div>
   </div>

  </Content>
        <Footer><footerbar></footerbar></Footer>
    </Layout>
</template>

<script>
import Cookies from 'js-cookie'
import headrbar from '@/components/headrbar'
import footerbar from '@/components/footerbar'
import hold from '@/assets/images/timg.jpg'
import {parseTime} from '@/utils/index'
// apis
import {userTravelList} from '@/api/travelUserInfo'
import {orderAdd, getOrderVon} from '@/api/order'
import {GetRoomCalendarList} from '@/api/hotel'
export default {
  data () {
    return {
      hold,
      user: '黎明',
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      tel: '1548679870',
      userinfo: '',
      voucherState: true,
      voucherUse: true,
      bedInfo: {},
      travelList: [],
      fullDate: [],
      voucher: {},
      disabledSave: false,
      startTimeOptions: {
        disabledDate (date) {
          return (
            date.valueOf() > new Date().valueOf() + 60 * 24 * 60 * 60 * 1000 ||
            date.valueOf() < new Date().valueOf() - 24 * 60 * 60 * 1000
          )
        }
      }, // 开始日期设置
      endTimeOptions: {
        disabledDate (date) {
          return (
            date.valueOf() > new Date().valueOf() + 60 * 24 * 60 * 60 * 1000 ||
            date.valueOf() <= new Date().valueOf()
          )
        }
      }, // 结束日期设置
      voucherQuery: {
        hotelId: 0,
        money: 0,
        pageIndex: 1,
        pageSize: 1000
      },
      calendarListQuery: {
        roomId: '',
        dateBegin: '',
        dateEnd: '',
        userId: 0
      },
      priceList: [],
      api1: false,
      orderParams: {
        UserId: 0,
        HotelId: 0,
        GuestRoomId: 0,
        GuestRoomTypeId: 0,
        ReserveTime: '',
        CheckinTime: '',
        CheckoutTime: '',
        GuestName: '',
        Phone: '',
        PayType: '',
        VoucherPrice: 0,
        ReserveType: '',
        PayMethod: '',
        TotalPrice: 0,
        ActPrice: 0,
        UsersVoucherId: 0,
        RoomNum: 1,
        WxPrice: 0,
        Id: 0
      }
    }
  },
  computed: {
    totalPrice () {
      let price = 0
      this.priceList.forEach((item, index) => {
        if (index < this.priceList.length - 1 && !item.IsFull) {
          price += item.Price
        }
      })
      price = price * this.orderParams.RoomNum
      this.orderParams.ActPrice = Math.max((price - this.orderParams.VoucherPrice), 0).toFixed(2)
      this.orderParams.TotalPrice = price
      this.voucherQuery.money = price
      this.getVoucherList()
      return price.toFixed(2)
    }

  },
  components: {
    headrbar,
    footerbar
  },
  methods: {
    selectDiscount () {
      if (this.voucherUse) {
        this.orderParams.VoucherPrice = this.voucher.OffsetMoney
        this.orderParams.UsersVoucherId = this.voucher.UsersVoucherId
        this.orderParams.ActPrice = Math.max((this.totalPrice - this.orderParams.VoucherPrice), 0).toFixed(2)
      } else {
        this.orderParams.VoucherPrice = 0
        this.orderParams.UsersVoucherId = 0
        this.orderParams.ActPrice = this.totalPrice
      }
    },
    decreasNum () {
      this.orderParams.RoomNum = Math.max(this.orderParams.RoomNum - 1, 1)
    },
    getTravelList () {
      userTravelList().then(res => {
        if (res.data.Code === 200) {
          res.data.Data.forEach((item) => {
            item.checked = false
          })
          this.travelList = res.data.Data
        }
      })
    },
    getUser (user) {
      this.userinfo = user.Name
      this.orderParams.GuestName = user.Name
      this.orderParams.UserId = user.Id
      this.orderParams.Phone = user.Mobile
      this.api1 = false
    },
    /**
     *生成订单
     */
    addOrder () {
      this.disabledSave = true
      this.orderParams.TotalPrice = this.totalPrice
      this.priceList.forEach((item, index) => {
        if (item.IsFull && index < this.priceList.length - 1) {
          this.fullDate.push(item.DateIndex)
        }
      })
      if (this.fullDate.length) {
        this.$Modal.warning({
          title: '温馨提示',
          content: `${this.fullDate.join('、')}已满房，请重新下单`,
          onOk: () => { this.$router.back(-1) }
        })
      } else {
        if (this.orderParams.CheckinTime && this.orderParams.CheckoutTime) {
          this.orderParams.CheckinTime = `${new Date(this.calendarListQuery.dateBegin).getFullYear()}-${new Date(this.calendarListQuery.dateBegin).getMonth() + 1}-${new Date(this.calendarListQuery.dateBegin).getDate()}`
          this.orderParams.CheckoutTime = `${new Date(this.calendarListQuery.dateEnd).getFullYear()}-${new Date(this.calendarListQuery.dateEnd).getMonth() + 1}-${new Date(this.calendarListQuery.dateEnd).getDate()}`
          orderAdd(this.orderParams).then(res => {
            this.disabledSave = false
            if (res.data.Code === 200) {
              this.orderParams.guestRoomTypeName = this.bedInfo.guestRoomTypeName
              if (this.orderParams.PayType === 'GPAZXF0001') {
                this.$router.push({name: 'payWay', params: res.data.Data})
              } else {
                this.$Message.success('预订成功！')
                this.$router.push('/member/order')
              }
            } else {
              this.$Message.warning(res.data.ShowData)
            }
          })
        } else {
          this.$Modal.warning({
            title: '温馨提示',
            content: '请选择入店和离店时间'
          })
        }
      }
    },
    getVoucherList () {
      this.voucherQuery.hotelId = this.orderParams.HotelId
      getOrderVon(this.voucherQuery).then(res => {
        if (res.data.Code === 200) {
          if (res.data.Data.List.length) {
            let list = []
            res.data.Data.List.forEach((item, index) => {
              if (item.Status === 0 && item.OffsetMoney < this.totalPrice) {
                list.push(item)
              }
            })
            if (list.length > 0) {
              this.voucher = list[0]
              this.voucherState = true
              this.selectDiscount()
            } else {
              this.voucherState = false
            }
          } else {
            this.voucherUse = false
            this.voucher = null
          }
        }
      })
    },
    // 日期格式化
    stringify (date, format) {
      if (!date) return ''
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const monthName = this.parseMonth(date)

      return format
        .replace(/yyyy/g, year)
        .replace(/MMMM/g, monthName)
        .replace(/MMM/g, monthName.substring(0, 3))
        .replace(/MM/g, ('0' + month).slice(-2))
        .replace(/dd/g, ('0' + day).slice(-2))
        .replace(/yy/g, year)
        .replace(/M(?!a)/g, month)
        .replace(/d/g, day)
    },
    parseMonth (date) {
      return this.months[date.getMonth()]
    },
    startTimeChange: function (e) {
      // 设置开始时间
      if (e) {
        this.calendarListQuery.dateBegin = e
        if (
          new Date(this.calendarListQuery.dateEnd).valueOf() > new Date(this.calendarListQuery.dateBegin).valueOf()
        ) {
          this.totalNingths = Math.ceil(
            (new Date(this.calendarListQuery.dateEnd).valueOf() -
            new Date(this.calendarListQuery.dateBegin).valueOf()) /
            (24 * 60 * 60 * 1000)
          )
        } else {
          this.calendarListQuery.dateEnd = parseTime(new Date(new Date(this.calendarListQuery.dateBegin).valueOf() + 24 * 60 * 60 * 1000))
        }
        this.getDateList()
        this.endTimeOptions = {
          disabledDate: date => {
            let startTime = this.calendarListQuery.dateBegin
              ? new Date(this.calendarListQuery.dateBegin).valueOf()
              : ''
            return (
              (date && date.valueOf() < startTime) ||
            date.valueOf() > (new Date().valueOf() + 90 * 24 * 60 * 60 * 1000) ||
            date.valueOf() < new Date().valueOf()
            )
          }
        }
      } else {
        this.calendarListQuery.dateBegin = new Date(this.orderParams.CheckinTime)
      }
      this.orderParams.CheckinTime = this.calendarListQuery.dateBegin
      this.orderParams.CheckoutTime = this.calendarListQuery.dateEnd
    },
    endTimeChange: function (e) {
      // 设置结束时间
      if (e) {
        this.calendarListQuery.dateEnd = e
        this.totalNingths = Math.ceil(
          (new Date(this.calendarListQuery.dateEnd).valueOf() -
          new Date(this.calendarListQuery.dateBegin).valueOf()) /
          (24 * 60 * 60 * 1000)
        )

        let endTime = this.calendarListQuery.dateEnd
          ? new Date(this.calendarListQuery.dateEnd).valueOf() - 1 * 24 * 60 * 60 * 1000
          : ''
        this.startTimeOptions = {
          disabledDate (date) {
            return (
              (date && date.valueOf() > endTime) ||
            date.valueOf() < new Date().valueOf() ||
            date.valueOf() > new Date().valueOf() + 90 * 24 * 60 * 60 * 1000
            )
          }
        }
      } else {
        this.calendarListQuery.dateEnd = parseTime(new Date(new Date(this.calendarListQuery.dateBegin.valueOf()) + 24 * 60 * 60 * 1000))
      }
      this.orderParams.CheckinTime = this.calendarListQuery.dateBegin
      this.orderParams.CheckoutTime = this.calendarListQuery.dateEnd
      this.getDateList()
    },
    /** 获取入住的日期列表 */
    getDateList () {
      GetRoomCalendarList(this.calendarListQuery).then(res => {
        if (res.data.Code === 200) {
          res.data.Data.forEach(item => {
            item.DateIndex = this.stringify(new Date(item.DateIndex), 'yyyy-MM-dd')
          })
          this.priceList = res.data.Data
          this.getVoucherList()
        }
      })
    }
  },
  mounted () {
    if (this.$route.params.hotelId && Cookies.get('usertoken')) {
      let start = new Date(this.$route.params.startTime)
      let end = new Date(this.$route.params.endTime)
      this.orderParams.CheckinTime = `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`
      this.orderParams.CheckoutTime = `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`
      this.orderParams.HotelId = this.$route.params.hotelId
      this.orderParams.GuestRoomId = this.$route.params.bedId
      this.orderParams.ReserveTime = new Date()
      this.orderParams.PayType = this.$route.params.payWay
      this.orderParams.ReserveType = 'VTAAGW0001'
      this.orderParams.WxPrice = this.$route.params.Price
      this.bedInfo = this.$route.params
      this.orderParams.PayMethod = this.$route.PayMethod
      this.orderParams.guestRoomTypeId = this.$route.params.guestRoomTypeId
      this.orderParams.UserId = JSON.parse(Cookies.get('user')).Id
      this.orderParams.GuestName = JSON.parse(Cookies.get('user')).Name
      this.orderParams.Phone = JSON.parse(Cookies.get('user')).Mobile
      this.calendarListQuery.dateBegin = this.orderParams.CheckinTime
      this.calendarListQuery.dateEnd = this.orderParams.CheckoutTime
      this.calendarListQuery.roomId = this.orderParams.GuestRoomId
      this.calendarListQuery.userId = this.orderParams.UserId
      this.getTravelList()
      this.getDateList()
    } else {
      this.$router.push({name: 'index'})
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.voucherUse .ivu-checkbox-checked .ivu-checkbox-inner{
    border-color: #f94;
    background-color: #f94;

}
.ivu-input{
    color:#666;
}
</style>

<style scoped>
.content{
width: 1200px;
min-height: 75vh;
margin: 0 auto;
padding-top:50px;

}
.ivu-layout-content{
    position: relative;
    top:0;
    bottom: 0;
    min-height: 100vh;
    width: 100vw;
}

.headerbar{
    width: 100%;
    position: relative;
}
.ivu-layout-content{
background: #fff;
}
.title{
margin:20px 0;
font-size:18px;
color:#444;
letter-spacing:2px;
border-bottom:1px solid #ccc;
padding: 20PX 0;
}
.subscribe-app{
    width: 1200px;
    margin:0 auto;
    display: flex;
}
.left{
width: 800px;
}
.item{
margin-bottom: 20PX;
}
.label{
    font-size: 14px;
    color:#333;
    margin-right: 30px;
}
.other{
    margin: 0 10px;
   font-size: 16px;
    color:#333;
}
.num{
     font-size: 18px;
     line-height: 26px;
    color:#333;
    margin: 0 20px;
}
.remove{
    font-size: 20px;
    color:#999;
}

.add{
    font-size: 20px;
    color:#f94;
}
.price{
    font-size: 14px;
    color:#f94;
    margin-right: 20px;
}
.right{
    margin-top:40px;
    width:280px;
    background:#eee;
    margin-left:30px;
}
.image img{
width:280px;
height: 170px;
border-radius:5px;

}
.address{
    margin-bottom:5px;
    font-size:14px;
    color:#666;
}
.address span{
    margin-right:20px
}
.detail-order>li>span{
font-size:12px;
margin-right:40px;
color:#666;

}
.detail-order>li{
    padding:5px;
}
.detail-total{
border-top:1px solid #eee;
padding:10px;
font-size:14px;
color:#666;
}
.userinfo-list li{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin:0 20px;
    padding:10px 0;
    border-bottom:1px solid #eee;
}
.userinfo-list li:last-child{
border-bottom:none;
}
.api1{
    max-height: 300px;
    overflow-y:scroll;
}
</style>
