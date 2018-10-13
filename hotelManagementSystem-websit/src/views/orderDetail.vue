
<template>
    <Layout>
        <Header  class="headerbar">
            <headrbar></headrbar>
        </Header>
        <Content>
        <div class="content">
           <p class="title">
               <span style="flex:1">订单信息</span>
              <Button type="warning" v-if="orderDetail.OrderStatus=='OSADZF0001'" style="margin:0 10px;cursor:pointer" @click="goPay()">去支付</Button>
              <Button type="warning" v-if="orderDetail.OrderStatus=='OSADZF0001'" style="cursor:pointer" @click="cancelOrder(orderDetail.Id)">取消订单</Button>
           </p>
             <ul class="orderInfo">
                 <li>订单号：{{orderDetail.OrderNum}}</li>
                 <li>订单状态：{{orderDetail.OrderStatus_Name}}</li>
                 <li>酒店名称：{{orderDetail.HotelName}}</li>
                  <li>客房类型：{{orderDetail.GuestRoomTypeName}}</li>
                  <li>入住时间：{{orderDetail.CheckinTime}}</li>
                 <li>离店时间：{{orderDetail.CheckoutTime}}</li>
                 <li>支付状态:{{orderDetail.PayStatus_Name}}</li>
                 <li>支付方式：{{orderDetail.PayType_Name}}</li>
             </ul>
           <p class="title">预订信息</p>
             <ul class="subcribInfo">
                 <li>入住人：{{orderDetail.GuestName}}</li>
                 <li>电话：{{orderDetail.Phone}}</li>
                 <li>预订时间：{{orderDetail.ReserveTime}}</li>
             </ul>
          <p class="title">订单详情</p>

             <ul class="detail" v-for="(item,index) in orderDetail.VewOrderDayPricesList" :key="index">
                 <li>入住价格：￥{{item.Price}}</li>
                 <li>入住：{{item.CheckinTime}}</li>
                 <li>房间数量：{{item.RoomNum}}</li>
             </ul>
             <div class="order-footer">
                <div style="font-size:14px;margin-right:20px;line-height:3">抵用券：<span v-if="orderDetail.VoucherPrice">{{orderDetail.VoucherPrice}}</span><span v-if="!orderDetail.VoucherPrice">0</span></div>
                 <p class="total"><span>总金额:</span><span style="color:#f94;font-size:16px;font-weight:600">￥{{orderDetail.TotalPrice}}</span></p>
                  <div class="actprice">
                      <span>实付金额:</span><span style="color:#f94;font-size:16px;font-weight:600" v-if="orderDetail.ActPrice">￥{{orderDetail.ActPrice}}</span>
                   <span style="color:#f94;font-size:16px;font-weight:600" v-if="!orderDetail.ActPrice">￥0</span>
                  </div>
             </div>
        </div>
        </Content>
        <Footer><footerbar></footerbar></Footer>
    </Layout>

</template>

<script>
import headrbar from '@/components/headrbar'
import footerbar from '@/components/footerbar'
import {parseTime} from '@/utils/index'
// apis
import {orderDetail, orderCancel} from '@/api/order'
export default {
  data () {
    return {
      orderId: 0,
      orderDetail: {}

    }
  },
  components: {
    headrbar,
    footerbar
  },
  methods: {
    getOrderDetail () {
      orderDetail(this.orderId).then(res => {
        if (res.data.Code === 200) {
          res.data.Data.CheckinTime = parseTime(new Date(res.data.Data.CheckinTime))
          res.data.Data.CheckoutTime = parseTime(new Date(res.data.Data.CheckoutTime))
          res.data.Data.ReserveTime = parseTime(new Date(res.data.Data.ReserveTime))
          res.data.Data.totalNights = Math.ceil((new Date(res.data.Data.CheckoutTime).valueOf() - new Date(res.data.Data.CheckinTime).valueOf()) / 1000 / 60 / 60 / 24)
          res.data.Data.VewOrderDayPricesList.forEach(item => {
            item.CheckinTime = parseTime(new Date(item.CheckinTime))
          })
          this.orderDetail = res.data.Data
        }
      })
    },
    cancelOrder (id) {
      let that = this
      this.$Modal.confirm({
        title: '温馨提示',
        content: '订单确认要取消吗？',
        onOk: function () {
          orderCancel(id).then(res => {
            if (res.data.Code === 200) {
              this.$Message.info({
                content: '取消成功,3s后自动返回首页',
                duration: 3,
                onClose: () => {
                  that.$router.push({name: 'index'})
                }
              })
            }
          })
        }
      })
    },
    goPay () {
      this.$router.push({name: 'payWay', params: this.orderDetail})
    }
  },
  mounted () {
    this.orderId = this.$route.query.id
    this.getOrderDetail()
  }
}
</script>
<style scoped>
.ivu-layout-content{
    position: relative;
    top:0;
    bottom: 0;
    min-height: 76vh;
    width: 100vw;
    background: #eee;
}
.headerbar{
    width: 100%;
    height: 80px;
    position: relative;
}
.content{
    width:1200px;
    margin:30px auto;
    background: #fff;
    height: 100%;
    min-height:76vh;
    padding: 30px 0;
}
.title{
padding:20px 0;
font-size:18px;
color:#444;
letter-spacing:2px;
border-bottom:1px solid #eee;
margin: 0 30px;
display: flex;
justify-content:space-between
}
ul{
    display: flex;
    width:800px;
    margin: 30px auto;
    font-size: 14px;
    color:#333;

}
.subcribInfo li,.detail li{
    flex:1
}
.orderInfo{
    flex-wrap: wrap;
}
.orderInfo li{
    width:400px;
    margin: 10px 0;
}
.order-footer{
    text-align: right;
    padding-right: 80px;
}
.order-footer span{
    margin-right: 20px;
    font-size: 14px;
}
</style>
