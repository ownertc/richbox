<template>
<div>

    <ul class="headerbar">
      <li v-for="(item,index) in tabBar" :key="index" :class="{active:index==currIndex}" @click="currIndex=index">{{item}}</li>
    </ul>
    <div class="common-use-wrap"  v-if="currIndex===0">
    <ul class="common-use">
      <li v-for="(item,index) in formdateList" :key="index">
        <div class="left">
          <p class="user"><span>{{item.Name}}</span><i class="fa fa-pencil-square-o" @click="goEdit(item)"></i></p>
          <p class="tel">手机号：{{item.Mobileform}}</p>
          <p class="idcard">{{item.CertificatesType}}：{{item.IdCardform}}</p>
        </div>
        <div class="right"><i class="fa fa-trash-o" aria-hidden="true"  @click="deleteTravalUser(item.Id,index)"></i></div>
      </li>
      <p v-if="list.length==0" style="color:#666;font-size:28rpx;text-align:center;margin-top:40rpx;">还没有常用旅客信息，赶快去添加吧！</p>
    </ul>
    <a href="/pages/addCommonUser/main"><button class="add">增加</button></a>
    </div>
    <div class="common-use-wrap"  v-if="currIndex===1">
    <ul class="common-use">
      <li v-for="(item,index) in formdateList" :key="index">
        <div class="left">
          <p class="user"><span>{{item.Name}}</span><i class="fa fa-pencil-square-o" @click="goEdit(item)"></i></p>
          <p class="tel">手机号：{{item.Mobileform}}</p>
          <p class="idcard">{{item.CertificatesType}}：{{item.IdCardform}}</p>
        </div>
        <div class="right"><i class="fa fa-trash-o" aria-hidden="true"  @click="deleteTravalUser(item.Id,index)"></i></div>
      </li>
      <p v-if="list.length==0" style="color:#666;font-size:28rpx;text-align:center;margin-top:40rpx;">还没有常用旅客信息，赶快去添加吧！</p>
    </ul>
    <a href="/pages/addCommonUser/main"><button class="add">增加</button></a>
    </div>
   <div class="common-use-wrap"  v-if="currIndex===2">
    <ul class="common-use">
      <li v-for="(item,index) in invoiceHeaderList" :key="index">
        <div class="left">
          <p class="user"><span>{{item.InvoiceName}}</span><i class="fa fa-pencil-square-o" @click="goEdit(item)"></i></p>
          <p class="tel">纳税人识别号：{{item.IdentifyNumber}}</p>
        </div>
        <div class="right"><i class="fa fa-trash-o" aria-hidden="true"  @click="deleteTravalUser(item.Id,index)"></i></div>
      </li>
      <p v-if="invoiceHeaderList.length==0" style="color:#666;font-size:28rpx;text-align:center;margin-top:40rpx;">还没有发票抬头，赶快去添加吧！</p>
    </ul>
    <a href="/pages/addInvoiceHeader/main"><button class="add">增加</button></a>
    </div>
  </div>
</template>
<script>
 import {getCommonInfoList, login, deleteTravalUsers, invoiceHeaderList} from '@/utils/api'
import * as fn from '@/utils/index'
export default {
   data () {
     return {
       list: [],
       invoiceHeaderList: [],
       mailAddressList: [],
       maxPage: 1,
       currIndex: 0,
       tabBar: ['常用旅客', '邮寄地址', '发票抬头'],
       invoiceHeaderParams: {
         pageIndex: 1,
         pageSize: 10
       },
       invoiceHeaderMaxPage: 1,
       queryParms: {
         pageIndex: 1,
         pageSize: 10
       }
     }
   },
   computed: {
     formdateList () {
       let list = []
       this.list.forEach((item) => {
         item.Mobileform = fn.plusXing(item.Mobile, 3, 3)
         item.IdCardform = fn.plusXing(item.IdCard, 4, 4)
         list.push(item)
       })
       return list
     }
   },
   methods: {
     getList () {
       if (this.queryParms.pageIndex <= this.maxPage) {
         getCommonInfoList(this.queryParms, {usertoken: this.queryParms.usertoken}).then(res => {
           if (res.Code === 401) {
             login()
             this.getList()
           } else {
             res.Data.forEach((item) => {
               item.Validity = item.Validity ? item.Validity.split('T')[0] : item.Validity
             })
             this.list = this.list.concat(res.Data)
             this.maxPage = Math.ceil(res.Data.Count / this.queryParms.pageSize)
             this.queryParms.pageIndex++
           }
         })
       }
     },
     getInvoiceHeaderList () {
       if (this.invoiceHeaderParams.pageIndex <= this.invoiceHeaderMaxPage) {
         invoiceHeaderList(this.invoiceHeaderParams).then(res => {
           this.invoiceHeaderList = this.invoiceHeaderList.concat(res.Data.List)
           this.invoiceHeaderMaxPage = Math.ceil(res.Data.Count / this.invoiceHeaderParams.pageSize)
           this.invoiceHeaderParams.pageIndex++
         })
       }
     },
     deleteTravalUser (id, index) {
       wx.showModal({
         title: '提示', // 提示的标题,
         content: '确定要删除吗？', // 提示的内容,
         showCancel: true, // 是否显示取消按钮,
         cancelText: '取消', // 取消按钮的文字，默认为取消，最多 4 个字符,
         cancelColor: '#666', // 取消按钮的文字颜色,
         confirmText: '确定', // 确定按钮的文字，默认为取消，最多 4 个字符,
         confirmColor: '#ff2d50', // 确定按钮的文字颜色,
         success: res => {
           if (res.confirm) {
             deleteTravalUsers(id).then(res => {
               if (res.Code === 200) {
                 this.list.splice(index, 1)
                 wx.showToast({
                   title: '删除成功', // 提示的内容,
                   icon: 'none', // 图标,
                   duration: 2000, // 延迟时间,
                   mask: true // 显示透明蒙层，防止触摸穿透,
                 })
               }
             })
           }
         }
       })
     },
     goEdit (data) {
       if (this.currIndex === 0) {
         let travalUser = JSON.stringify(data)
         wx.navigateTo({ url: `../../pages/addCommonUser/main?travalUser=${travalUser}` })
       } else if (this.currIndex === 2) {
         let travalUser = JSON.stringify(data)
         wx.navigateTo({ url: `../../pages/addCommonUser/main?travalUser=${travalUser}` })
       }
     }
   },
   /**
   * 页面上拉触底事件的处理函数
   */
   onReachBottom: function () {
     if (this.currIndex === 0) {
       this.getList()
     } else if (this.currIndex === 2) {
       this.getInvoiceHeaderList()
     }
   },
   onShow () {
     this.getList()
     this.getInvoiceHeaderList()
   }
}
</script>

<style scope>
page{
  background: #eee;
  
}
.common-use-wrap{
  margin-top:100rpx;
}
.common-use li{
margin: 30rpx 0;
background: #fff;
padding: 0 30rpx;
box-sizing:border-box; 
display: flex;
justify-content: space-between;
height: 180rpx;
}
.left{
  flex: 1;
}
.user{
  margin: 20rpx 0;
  color:#333;
  font-size: 30rpx;
}
.user i{
  margin-left: 30rpx;
  font-size: 40rpx;
  color:#666;
}
.tel,.idcard{
  font-size: 28rpx;
  color:#666;
}
.right i{
  padding: 30rpx;
  font-size: 40rpx;
  color:#666;
}
.add{
margin: 60rpx 40rpx;
color:#fff;
background: #3D3d3d;
font-size: 32rpx;
letter-spacing: 3px;
}
.headerbar{
width: 100vw;
height:80rpx;
line-height: 80rpx;
font-size: 30rpx;
color:#333;
display: flex;
align-items: center;
justify-content: center;
background: #fff;
position: fixed;
top:0;
left: 0;
z-index: 999;
}
.headerbar li{
  flex:1;
  height:80rpx;
  line-height:80rpx;
  text-align: center;
}
.headerbar li.active{
  color:#ec5045;
}
</style>
