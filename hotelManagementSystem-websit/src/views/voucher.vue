
<template>
<div>
  <ul class="tabbar">
    <li class="item" style="font-size:16px">抵用券</li>
  </ul>
   <table width="100%" style="margin-top:30px; border-collapse: collapse;">
        <tr class="tabheadr">
            <td>抵用券</td>
            <td>酒店</td>
            <td>满额使用</td>
            <td>有效时间</td>
            <td>使用范围</td>
            <td>使用状态</td>
        </tr>
        <tr v-if="list.length" v-for="(item,index) in list" :key="index">
            <td>
              {{item.OffsetMoney}}元
            </td>
            <td><span v-if="item.HotelId">{{item.HotelName}}</span><span v-if="!item.HotelId">所有酒店</span></td>
            <td><span v-if="item.QuotaUse">{{item.QuotaUse}}</span><span v-if="!item.QuotaUse||item.VTAAQB0001">不限</span></td>
            <td><span v-if="item.EndTime&&item.BeginTime">{{item.BeginTime}}到{{item.EndTime}}</span><span v-if="!item.EndTime||!item.BeginTime">不限</span></td>
            <td class="option"><span v-if="item.UsePort_Name">{{item.UsePort_Name}}</span><span v-if="!item.UsePort_Name">全部</span></td>
            <td><span v-if="!item.IsUse">未使用</span><span v-if="item.IsUse">已使用</span></td>
        </tr>
<tr v-if="!this.list">
            <td colspan="5">
              没有可用抵用券！
            </td>

        </tr>
     </table>
</div>

</template>

<script>
import {voucherList} from '@/api/voucher'
import {parseTime} from '@/utils/index'
export default {
  data () {
    return {
      currIndex: 0,
      list: [],
      query: {
        pageIndex: 1,
        pageSize: 1000
      }

    }
  },
  methods: {

    getVoucherList () {
      voucherList(this.query).then(res => {
        if (res.data.Code === 200) {
          res.data.Data.forEach((item, index) => {
            item.BeginTime = parseTime(new Date(item.BeginTime))
            item.EndTime = parseTime(new Date(item.EndTime))
          })
          this.list = res.data.Data
        }
      })
    }
  },
  mounted () {
    this.getVoucherList()
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
tr td{
font-size: 12px;
color:#666;
line-height: 2;
}

.option span{
margin-right: 10px;
}
</style>
