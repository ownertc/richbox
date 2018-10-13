
<template>
<div>
  <ul class="tabbar" style="width:100%;padding-right:40%;">
    <li class="item" v-for="(item,index) in tabbar" :key="index" :class="{active:index==currIndex}" @click="selectDetail(index)" style="cursor:pointer">{{item}}</li>
  </ul>
   <table width="100%" style="margin-top:30px; border-collapse: collapse;">
        <tr v-for="(item,index) in orderLists" :key="index" v-if="currIndex!=1">
            <td>
                <p class="hotelName">{{item.HotelName}}</p>
                <p>入住时间：{{item.CheckinTime}}</p>
                <p>离店时间：{{item.CheckoutTime}}</p>
            </td>
            <td>￥{{item.TotalPrice}}</td>
            <td>{{item.OrderNum}}</td>
            <td>
                <span v-if="item.OrderStatus!='OSADZF0001'" style="margin-right:10px;">{{item.OrderStatus_Name}}</span>
                <span v-if="item.OrderStatus=='OSADZF0001'" style="color:#f94;margin:0 10px;cursor:pointer">
                   <router-link :to="{name:'payWay',params:item}" style="color:#f94">
                  去支付
                  </router-link>
                </span>
                <span v-if="item.OrderStatus=='OSADZF0001'" style="color:#f94;cursor:pointer" @click="cancelOrder(item.Id)">取消订单</span>
            </td>
            <td class="option" style="cursor:pointer"><router-link :to="{path:'/orderDetail',query:{id:item.Id}}" style="color:#f94">查看详情</router-link></td>
        </tr>
         <tr v-for="(item,index) in orderListsOnline" :key="index" v-if="currIndex==1">
            <td>
                <p class="hotelName">{{item.HotelName}}</p>
                <p>入住时间：{{item.CheckinTime}}</p>
                <p>离店时间：{{item.CheckoutTime}}</p>
            </td>
            <td>￥{{item.TotalPrice}}</td>
            <td>{{item.OrderNum}}</td>
            <td>
                <span v-if="item.OrderStatus!='OSADZF0001'" style="margin-right:10px;">{{item.OrderStatus_Name}}</span>
                <span v-if="item.OrderStatus=='OSADZF0001'" style="color:#f94;margin:0 10px;cursor:pointer">去支付</span>
                <span v-if="item.OrderStatus=='OSADZF0001'" style="color:#f94;cursor:pointer" @click="cancelOrder(item.Id)">取消订单</span>
            </td>
            <td class="option" style="cursor:pointer"><router-link :to="{path:'/orderDetail',query:{id:item.Id}}" style="color:#f94">查看详情</router-link></td>
        </tr>
     </table>
     <p style="text-align:center;color:#666;width:100%" v-if="!total&&currIndex!=1">暂无相关订单！</p>
      <Page :total="total" style="margin:20px;" @on-change="getList($event)" v-if="total&&currIndex!=1"></Page>
       <p style="text-align:center;color:#666;width:100%" v-if="!orderListsOnline.length&&currIndex==1">暂无相关订单！</p>
      <Page :total="orderListsOnline.length" style="margin:20px;" @on-change="getList($event)" v-if="orderListsOnline.length&&currIndex==1"></Page>
</div>

</template>

<script>

// apis
import {orderList, orderCancel} from '@/api/order'
import {parseTime} from '@/utils/index'
export default {
  data () {
    return {
      currIndex: 0,
      tabbar: ['全部订单', '进行中', '已完成', '已取消'],
      total: 0,
      orderListsOnline: [],
      OrderStatus: [
        'OSADZF0001', // 待支付
        'OSADRZ0001', // 待入住
        'OSAYQR0001', // 已确认
        'OSAYWC0001', // 已完成
        'OSAYQX0001' // 已取消
      ],
      orderLists: [],
      orderQuery: {
        status: '',
        pageIndex: 1,
        pageSize: 10
      }

    }
  },
  methods: {
    getOrderList () {
      this.orderListsOnline = []
      orderList(this.orderQuery).then(res => {
        if (res.data.Code === 200) {
          this.total = res.data.Data.Count
          res.data.Data.List.forEach(item => {
            item.CheckinTime = parseTime(new Date(item.CheckinTime))
            item.CheckoutTime = parseTime(new Date(item.CheckoutTime))
            if (item.OrderStatus !== 'OSAYQX0001' && item.OrderStatus !== 'OSAYQR0001' && item.OrderStatus !== 'OSAYWC0001' && this.currIndex === 1) {
              this.orderListsOnline.push(item)
            }
          })
          this.orderLists = res.data.Data.List
        }
      })
    },
    getList (e) {
      if (this.currIndex !== 1) {
        this.orderQuery.pageIndex = e
        this.getOrderList()
      }
    },
    selectDetail (index) {
      this.orderQuery.pageIndex = 1
      this.orderLists = []
      this.currIndex = index
      if (this.currIndex !== 1 && this.currIndex !== 0) {
        this.orderQuery.status = this.OrderStatus[this.currIndex + 1]
        this.getOrderList()
      } else if (this.currIndex === 0) {
        this.orderQuery.status = ''
        this.getOrderList()
      } else if (this.currIndex === 1) {
        this.orderQuery.status = ''
        this.orderQuery.pageSize = 10000
        this.getOrderList()
      }
    },
    cancelOrder (id) {
      this.$Modal.confirm({
        title: '温馨提示',
        content: '订单确认要取消吗？',
        onOk: function () {
          orderCancel(id).then(res => {
            if (res.data.Code === 200) {
              this.$Message.success('订单取消成功！')
              this.getOrderList()
            }
          })
        }
      })
    }
  },
  mounted () {
    this.getOrderList()
  }
}
</script>
<style scoped>
.ivu-layout-content{
    position: relative;
    top:0;
    bottom: 0;
    min-height: 100vh;
    width: 100vw;
}
.headerbar{
    width: 100%;
    height: 50px;
    position: relative;
}

li.active{
color:#f94
}
.tabbar{
display: flex;
align-items: center;
margin-top: 30px;
justify-content: space-between;
border-bottom:1px solid #ccc;
padding: 0 20px 20px 20px;
}
.userinfo{
width:200px;
display: flex;
justify-content: space-between;
margin-right: 50px;
}
.avter{
width:50px;
height: 50px;
border-radius: 50%;
background: #f94;
}
.name{
    font-size: 14px;
    font-weight: 600;
    color:#333;
}
.score{
    font-size:12px;
    color:#666;
     margin-top: 10px;
}
.score span{
    margin-right: 20px;

}
.item{
font-size: 13px;
color:#333;
}
tr{
border-bottom: 1px solid #ccc;
}
.tabheadr{
height: 40px;
background: #ccc;
border: none;
}
tr td{
    text-align: center;
    padding: 10px;
}
tr td P,tr td{
font-size: 12px;
color:#666;
line-height: 2;
}
tr td P.hotelName{
font-size: 13px;
color:#333;
font-weight: 600;
line-height: 2;
}
.option a,.option a:hover{
    color:#f94;
}
</style>
