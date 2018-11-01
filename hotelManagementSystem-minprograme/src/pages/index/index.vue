<template>

  <div>
    <div class="section">
  <picker mode="date" :value="startDate" :start="startDate" :end="endDate" @change="bindDateStartChange($event)">
    <span class="picker">
      入住: {{queryParams.dateBegin}}
    </span>
  </picker>
  <span>{{totalNight}}晚</span>
   <picker mode="date" :value="startDate" :start="queryParams.dateBegin" :end="endDate" @change="bindDateChange($event)">
    <span class="picker">
      离店: {{queryParams.dateEnd}}
    </span>
  </picker>
<img :src="navall" style="width:40rpx;height:40rpx" @click="citySelect=true"/>
</div>

    <!-- 列表开始 -->
    <ul class="list-warp" style="margin:110rpx 0">
      <li v-for="(item,index) in list" :key="index" class="item" @click="goDetail(item.Id)">
        <div :style="{backgroundImage:'url(' +layzImg + ')',backgroundPosition:'center' }"  class="imgWrap">
          <img :src="item.PicPath" class="imgWrap"/>
         </div>
        <div class="right">
          <p class="title">{{item.Name}}</p>
          <p class="address">{{item.AddressInfo}}</p>
          <p class="address-detail">{{item.CoordinatesDescription}}</p>
          <p class="price"><span>￥</span><span>{{item.MinPirce}}</span><span>起</span></p>
        </div>
      </li>
    </ul>
    <p style="color:#666;font-size:30rpx;text-align:center" v-if="list.length==0">没有找到符合条件的相关酒店！</p>
    <p style="color:#666;font-size:30rpx;text-align:center;margin-bottom:100rpx"  v-if="list.length>0&&queryParams.pageIndex>maxPage">暂无更多数据</p>
   <!--  列表结束 -->
     
   <div  class="cityselct" :class="{hide:!citySelect}">
     
      <div>
         <p class="title">酒店所在城市</p>
         <scroll-view scroll-y style="max-height:250rpx;padding:0 30rpx" :scroll-x="false" :sroll-y="true"> 
        <div @click="currCityIndex=index" class="item" :class="{active:currCityIndex==index}" v-for="(item,index) in citylist" :key="index" >{{item.Value}}</div>
        
       </scroll-view>
        <div class="btns">
        <span @click="citySelect=false">取消</span>
        <span @click="confirm()">确认</span>
      </div>
      </div>
      </div>
      <div style="background:rgba(0,0,0,.3);z-index:99;position:fixed;top:0;left:0;bottom:0;height:100%;z-index:999;width:100vw"  v-if="citySelect"></div>
  </div>

</template>

<script>
// imgaes
import navall from '@/asset/images/navall.png'
// imgaes
import layzImg from '@/asset/images/layzImg.png'

// api
import {queryHotelList, getCitylist} from '@/utils/api'
export default {
  data () {
    return {
      navall,
      layzImg,
      currCityIndex: 0,
      note: {
        backgroundImage: 'url(' + layzImg + ')'
      },
      citySelect: true,
      startDate: new Date(),
      citylist: [],
      totalNight: '1',
      maxPage: 1,
      endDate: '',
      queryParams: {
        areaId: 0,
        dateBegin: '',
        dateEnd: '',
        pageIndex: 1,
        pageSize: 10
      },
      list: [ ]
    }
  },

  methods: {

    goDetail (id) {
      wx.navigateTo({ url: `../../pages/hotelDetail/main?hotelId=${id}&dateBegin=${this.queryParams.dateBegin}&dateEnd=${this.queryParams.dateEnd}` })
    },
    bindDateStartChange (e) {
      this.queryParams.dateBegin = e.target.value
      this.queryParams.dateEnd = this.timestampToTime(new Date(this.queryParams.dateBegin.replace(/-/g, '/')).getTime() + 24 * 60 * 60 * 1000)
      this.maxPage = 1
      this.queryParams.pageIndex = 1
      this.list = []
      this.totalNight = 1
      this.queryList()
    },
    bindDateChange (e) {
      this.queryParams.dateEnd = e.target.value
      this.maxPage = 1
      this.queryParams.pageIndex = 1
      this.list = []
      let tim3 = new Date(this.queryParams.dateEnd.toString().replace(/-/g, '/')).valueOf()
      let tim4 = new Date(this.queryParams.dateBegin.toString().replace(/-/g, '/')).valueOf()
      this.totalNight = Math.floor(tim3 - tim4) / 1000 / 24 / 60 / 60
      this.queryList()
    },
    timestampToTime (timestamp) {
      var date = new Date(timestamp)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      return (Y + M + D)
    },
    queryList () {
      if (this.queryParams.pageIndex <= this.maxPage) {
        queryHotelList(this.queryParams).then(res => {
          if (res.Code === 200) {
            this.list = this.queryParams.pageIndex === 1 ? [] : this.list
            this.list = this.list.concat(res.Data.List)
            this.maxPage = Math.ceil(res.Data.Count / this.queryParams.pageSize)
            wx.setStorageSync('list', this.list)
            this.queryParams.pageIndex++
          }
        })
      }
    },
    confirm () {
      this.citySelect = false
      this.queryParams.areaId = this.citylist[this.currCityIndex].Key
      if (this.citylist[this.currCityIndex].Key !== wx.getStorageSync('currKey')) {
        this.maxPage = 1
        this.queryParams.pageIndex = 1
        this.queryParams.pageSize = 10
        this.list = []
        wx.setStorageSync('currIndex', this.currCityIndex)
        wx.setStorageSync('currKey', this.citylist[this.currCityIndex].Key)
        this.queryList()
      }
    },
    getCitys () {
      getCitylist().then(res => {
        this.citylist = res.Data
        this.citylist.unshift({Key: 0, Value: '全部'})
        wx.setStorageSync('citys', this.citylist)
      })
    },
    initData () {
      this.list = wx.getStorageSync('list')
      this.citylist = wx.getStorageSync('citys')
      this.totalNight = 1
      this.startDate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
      let timestamp = new Date().getTime() + 3 * 30 * 24 * 60 * 60 * 1000
      this.endDate = this.timestampToTime(timestamp)
      this.queryParams.dateBegin = this.startDate
      this.queryParams.dateEnd = this.timestampToTime(new Date().getTime() + 24 * 60 * 60 * 1000)
    },
    /**
   * 获取缓存默认城市
   */
    getStorageCitys () {
      this.getCitys()
      if (wx.getStorageSync('currIndex') && wx.getStorageSync('currKey')) {
        let value = wx.getStorageSync('currIndex')
        let currIndex = -1
        this.citylist.forEach((item, index) => {
          if (item.Value === value) {
            this.queryParams.areaId = item.Key
            currIndex = index
          }
        })

        if (currIndex >= 0) {
          this.citySelect = false
          this.currCityIndex = currIndex
        } else {
          this.currCityIndex = 0
          this.areaId = 0
        }
      }
    }
  },
  onPullDownRefresh () {
    wx.showNavigationBarLoading()// 在标题栏中显示加载
    this.maxPage = 1
    this.queryParams.pageIndex = 1
    queryHotelList(this.queryParams).then(res => {
      if (res.Code === 200) {
        this.list = []
        this.list = res.Data.List
        this.maxPage = Math.ceil(res.Data.Count / this.queryParams.pageSize)
        this.queryParams.pageIndex++
        wx.setStorageSync('list', this.list)
        wx.hideNavigationBarLoading()
      }
    })
  },
  onReachBottom () {
    this.queryList()
  },
  onLoad () {
    this.getStorageCitys()
    this.initData()
    this.queryList()
    if (!wx.getStorageSync('User')) {
      wx.navigateTo({ url: '../../pages/register/main' })
    }
  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.section{
  display: flex;
  padding: 30rpx;
  box-sizing: border-box;
  border-top:2rpx solid #ccc;
  border-bottom:2rpx solid #ccc;
  justify-content: space-between;
  font-size:30rpx;
  color: #666;
  position: fixed;
  top:0;
  left:0;
  width:100%;
  z-index: 9999;
  background: #fff;
}
.item{
  display: flex;
  justify-content: space-between;
 
  margin: 30rpx 40rpx;
}
.imgWrap{
  width: 300rpx;
  height: 300rpx;
  border-radius: 20rpx;
}
.right{
  flex:1;
  margin-left: 20rpx;
}
.title{
  font-size: 30rpx;
  color:#333;
  margin: 10rpx 0;
  font-weight: 500;
}
.address{
  font-size: 28rpx;
  color:#666;
  margin-bottom: 10rpx;
}
.address-detail{
  font-size: 28rpx;
  color:#999;
  margin-bottom: 10rpx;
  
}
.price{
  text-align: right;
}
.price>span:nth-child(2n+1){
  font-size: 26rpx;
  color:#333;
}
.price>span:nth-child(2n){
   font-size: 32rpx;
  color:#ff2d50;
  font-weight: 500;
}
.cityselct{
  width: 620rpx;
  max-height:600rpx;
  background: #fff;
  z-index: 99999;
  position: fixed;
  top:50%;
  left:50%;
  margin-left:-300rpx;
  margin-top: -350rpx;
  border-radius: 20rpx;
  box-shadow: 1px 2px 5px rgba(0,0,0,.1);
  border:2rpx solid rgba(0,0,0,.2);
  padding-bottom: 20rpx;
  transition: all 0.5s;
  transform: translateX(0)
}
.cityselct.hide{
  transform: translateX(120%)
}
.cityselct .title{
  text-align: center;
  line-height: 2;
  font-size: 32rpx;
}

.cityselct .item{
  display: inline-block;
  font-size: 30rpx;
  width: 165rpx;
  height:60rpx;
  line-height: 60rpx;
 overflow: hidden;
 white-space:nowrap;   
 text-overflow: ellipsis; 
  flex:1;
  text-align: center;
  border:1px solid #ccc;
  margin: 10rpx;
  color:#666;
 
}
.cityselct .item.active{
  border-color:#ff2d50;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.btns{
  display: flex;
  height: 60rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30rpx;
  border-top:2rpx solid #ccc;
}
.btns>span{
flex:1;
text-align: center;
font-size: 32rpx;
color:#666;
}
</style>
