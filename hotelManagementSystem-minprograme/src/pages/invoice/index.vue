<template>
  <div class="wrap">
      <p style="text-align:right;"><a href="../../pages/applyInvoice/main" style="font-size:30rpx;color:#000;padding:20rpx 5vw;">申请发票</a></p>
         <ul class="lists">
              <li class="item" @click="goDetail(item.Id)" v-for="(item,index) in list" :key="index">
                    <p><span>发票抬头：</span><span>{{item.InvoiceName}}</span></p>
                    <p><span>发票金额：</span><span>￥{{item.TotalPrice}}</span></p>
                    <p><span>发票状态：</span><span>{{item.InvoiceStatus}}</span></p>
                    <p><span>申请时间：</span><span>{{item.CreatorTime}}</span></p>
              </li>
         </ul>
  </div>
</template>

<script>
import {getInvoiceList} from '@/utils/api'
import {paramsTime} from '@/utils/index'
export default {
  data () {
    return {
      list: [],
      maxPage: 1,
      queryParams: {
        pageIndex: 1,
        pageSize: 10
      }
    }
  },

  methods: {
    goDetail (id) {
      wx.navigateTo({ url: `../../pages/invoiceDetail/main?id=${id}` })
    },
    loadData () {
      if (this.maxPage >= this.queryParams.pageIndex) {
        getInvoiceList(this.queryParams).then(res => {
          if (res.Code === 200) {
            this.queryParams.pageIndex += 1
            this.maxPage = Math.ceil(res.Data.Count / this.queryParams.pageSize)
            res.Data.List.forEach(item => {
              item.CreatorTime = paramsTime(new Date(item.CreatorTime))
            })
            this.list = this.list.concat(res.Data.List)
          }
        })
      }
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadData()
  },
  onShow () {
    this.loadData()
  }
}
</script>

<style scoped>
.wrap{
    background: #eee;
    min-height:100vh;
}
ul{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.item{
    width: 90vw;
    background: #fff;
    margin-top: 20rpx;
    border-radius: 10rpx;

}
.item p{
    font-size: 28rpx;
    line-height: 2;
    margin-left: 20rpx;
    color:#666;
}
.item p:nth-child(1){
    margin-top: 20rpx;
}
.item p:last-child{
    margin-bottom: 20rpx;
}
</style>
