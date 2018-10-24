<template>
<Layout style="width:100vw;overflow:hidden;">
        <Header  class="headerbar">
            <headrbar></headrbar>
        </Header>
    <Content>
  <div class="detail-app">
    <div class="topdesc">
       <p class="name">{{hotelDetialInfo.Hotel.Name}}</p>
       <div class="others">
         <p><span>地址：{{hotelDetialInfo.Hotel.AddressSSQ}}</span><span>电话：{{hotelDetialInfo.Hotel.PhoneNumber}}</span></p>
         <Button type="warning" @click="checkMap()">查看地图</Button>
       </div>
    </div>
    <div class="imglist">
       <slide :images="hotelDetialInfo.Albums"></slide>
    </div>
    <Tabs  v-model="tabCurrntName" class="detailhotel">
        <Tab-pane label="酒店预订" name="key1">
           <i-form  :label-width="80">
           <Row>
                <i-col span="4">
                    <Form-item prop="date" label="入住日期" class="date-item">
                        <Date-picker type="date" placeholder="选择日期" v-model="starttime" @on-change="startTimeChange($event)" :options="startTimeOptions"></Date-picker>
                    </Form-item>
                </i-col>
                <i-col span="4">
                    <Form-item prop="time" label="离店日期"  class="date-item">
                     <Date-picker type="date" placeholder="选择日期" v-model="endtime"  @on-change="endTimeChange($event)" :options="endTimeOptions"></Date-picker>
                    </Form-item>
                </i-col>
               <i-col span="2"  style="line-height:40px;text-align:center;font-size:14px" v-if="totalNingths">共{{totalNingths}}晚</i-col>
            </Row>
           </i-form>
     <div  v-for="(item1,index1) in hotelDetialInfo['GuestRoomType']" :key="index1">
           <table width="100%" >
           <tr class="heaadr" v-if="index1==0"><td style="width:400px">房型</td><td  style="width:150px">床型</td><td style="width:120px">早餐</td><td style="width:120px;">取消规则</td><td style="width:120px">挂牌价</td><td style="width:150px" >官网预订价</td><td style="width:200px"></td></tr>
            <tr  v-for="(bed,index2) in item1.GuestRooms" :key="index2">
              <td :rowspan="item1.GuestRooms.length"  class="tdzoom" v-if="index2==0" style="width:400px"><div class="zomm"><img :src="item1.GuestRoomType.PicPath" alt="" style="margin-left:0"><p><span>{{item1.GuestRoomType.NameCode}}</span><span @click="checkDetail(bed,index1)" style="cursor:pointer" v-if="!item1.showDetail">查看详情<Icon type="ios-arrow-down" /></span><span @click="item1.showDetail=false" style="cursor:pointer" v-if="item1.showDetail">收起详情<Icon type="ios-arrow-up" /></span></p></div></td>
               <td style="width:150px">{{bed.BedType_Name}}</td><td style="width:120px">{{bed.BreakfastInfo_Name}}</td>
                    <td style="width:120px"><span v-if="bed.Payway=='GPAZXF0001'">不可取消</span><span v-if="bed.Payway!='GPAZXF0001'">免费取消</span></td>
                    <td style="width:120px">￥{{bed.Price}}</td>
                    <td style="width:150px"><span v-if="!login"><router-link to="/login" style="color:#666">会员登录后可见</router-link></span><span v-if="login">￥{{bed.WxPrice}}</span></td>
                    <td class="pay" style="width:200px">
                      <img :src="xian" alt="" v-if="bed.Payway=='GPAZXF0001'&&!bed.WxIsFull" @click="subcrib(bed,index1)">
                      <img :src="dian" alt="" v-if="bed.Payway!='GPAZXF0001'&&!bed.WxIsFull" @click="subcrib(bed,index1)">
                      <img :src="fullXian" alt="" v-if="bed.Payway=='GPAZXF0001'&&bed.WxIsFull" @click="subcrib(bed,index1)">
                      <img :src="fullDian" alt="" v-if="bed.Payway!='GPAZXF0001'&&bed.WxIsFull" @click="subcrib(bed,index1)">
                </td>
            </tr>
           </table>
      <transition name="fade">
        <div v-if="item1.showDetail">
          <div class="detail" >
              <p class="base"><span>面积：{{item1.detail.Area}}m<sup>2</sup></span><span>楼层：{{item1.detail.FloorRange}}层</span></p>
              <p>房间设施:<span style="margin-right:10px" v-for="(config,index3) in item1.ConfigList" :key="index3">{{config.Value}}</span></p>
              <img :src="close" alt="" class="close" @click="item1.showDetail=false">
            </div>
             <ul class="zoom-list">
                <li v-for="(item,index) in item1.Albums" :key="index"><img :src="item.PicPath" alt=""></li>
            </ul>
            </div>

         </transition>
         </div>

             <p class="titledetail">酒店详情</p>
          <p class="desc">酒店介绍：{{hotelDetialInfo.Hotel.Introduction}}</p>
           <p class="desc">酒店设施：<span style="margin-right:10px" v-for="(config ,index) in hotelDetialInfo.ConfigList" :key="index">{{config.Value}}</span></p>
         <p class="desc">入住须知:
           &nbsp;&nbsp;&nbsp;&nbsp;入住和离店：入住时间 {{hotelDetialInfo.Hotel.CheckinTime}}以后,
           &nbsp;&nbsp;&nbsp;&nbsp;离店时间 {{hotelDetialInfo.Hotel.DepartureTime}}以前
           &nbsp;&nbsp;&nbsp;&nbsp;儿童政策：<span v-if="hotelDetialInfo.Hotel.IsChildPolicy">不</span>接受18岁以下客人单独入住
           &nbsp;&nbsp;&nbsp;&nbsp;宠物政策： <span v-if="hotelDetialInfo.Hotel.IsNotPets">不允许携带宠物</span>
         </p>
          <p class="desc">电话：{{hotelDetialInfo.Hotel.PhoneNumber}}</p>
            <p class="titledetail" >地图周边</p>
      <baidu-map class="bm-view" ak="W4IWtWtBm31otTxfsX3iZTZUa6obYym8" :center="center" style="width:1200px;height:800px" :zoom="15">
            <bm-marker :position="center" >
      <bm-label :content="hotelDetialInfo.Hotel.Name" :labelStyle="{color: '#fff', fontSize : '18px',background:'#f94',padding:'5px 20px',border:'none'}" :offset="{width: -35, height: 30}" />
            </bm-marker>
             <bm-control>
                  <ul class="btns">
                    <li v-for="(item,index) in btnsText" :key="index" :class="{active:index==btnsIndex}" @click="poiSeacher(index)"><span>{{item}}</span></li>
                  </ul>
              </bm-control>
              <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location" class="posiRes" ></bm-local-search>
         </baidu-map>
        </Tab-pane>
        <Tab-pane label="酒店详情"  name="key2">
          <p class="titledetail">酒店详情</p>
          <p class="desc">酒店介绍：{{hotelDetialInfo.Hotel.Introduction}}</p>
           <p class="desc">酒店设施：<span style="margin-right:10px" v-for="(config ,index) in hotelDetialInfo.ConfigTree" :key="index">{{config.Value}}</span></p>
         <p class="desc">入住须知:
           &nbsp;&nbsp;&nbsp;&nbsp;入住和离店：入住时间 {{hotelDetialInfo.Hotel.CheckinTime}}以后,
           &nbsp;&nbsp;&nbsp;&nbsp;离店时间 {{hotelDetialInfo.Hotel.DepartureTime}}以前
           &nbsp;&nbsp;&nbsp;&nbsp;儿童政策：<span v-if="hotelDetialInfo.Hotel.IsChildPolicy">不</span>接受18岁以下客人单独入住
           &nbsp;&nbsp;&nbsp;&nbsp;宠物政策： <span v-if="hotelDetialInfo.Hotel.IsNotPets">不允许携带宠物</span>
         </p>
          <p class="desc">电话：{{hotelDetialInfo.Hotel.PhoneNumber}}</p>
        </Tab-pane>
        <Tab-pane label="地图周边"  name="key3">
           <p class="titledetail">地图周边</p>
         <baidu-map class="bm-view" ak="W4IWtWtBm31otTxfsX3iZTZUa6obYym8" :center="center" style="width:1200px;height:800px" :zoom="15">
            <bm-marker :position="center" >
      <bm-label :content="hotelDetialInfo.Hotel.Name" :labelStyle="{color: '#fff', fontSize : '18px',background:'#f94',padding:'5px 20px',border:'none'}" :offset="{width: -35, height: 30}" />
            </bm-marker>
             <bm-control>
                  <ul class="btns">
                    <li v-for="(item,index) in btnsText" :key="index" :class="{active:index==btnsIndex}" @click="poiSeacher(index)">{{item}}</li>
                  </ul>
              </bm-control>
              <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location" class="posiRes" ></bm-local-search>
         </baidu-map>
        </Tab-pane>
    </Tabs>
  </div>

  </Content>
     <Footer><footerbar></footerbar></Footer>
      <Spin size="large" fix v-if="spinShow" style="z-index:9999"></Spin>
      <Modal v-model="modal"  title="温馨提示" ok-text="登录" cancel-text="去注册" @on-ok='ok()' @on-cancel='cancle()' >
        <div>{{modalMessage}}</div>
    </Modal>
    </Layout>
</template>

<script>
import headrbar from '@/components/headrbar'
import footerbar from '@/components/footerbar'
import slide from '@/components/slide'
import Cookies from 'js-cookie'

import hold from '@/assets/images/timg.jpg'
import dian from '@/assets/images/dian.png'
import xian from '@/assets/images/xian.png'
import fullDian from '@/assets/images/full-dian.png'
import fullXian from '@/assets/images/full-xian.png'
import close from '@/assets/images/close.png'

import { GetHotelInfo } from '@/api/hotel'
import {parseTime} from '@/utils/index'

export default {
  data () {
    return {
      hold,
      dian,
      xian,
      fullDian,
      fullXian,
      close,
      spinShow: true,
      login: false,
      tabCurrntName: 'key1',
      location: '',
      keyword: '',
      modal: false,
      totalNingths: 1,
      btnsIndex: -1,
      modalMessage: '',
      btnsText: ['交通', '教育', '医疗', '购物', '生活', '购物', '娱乐'],
      center: {
        lng: '',
        lat: ''
      },
      offset: {
        width: 40,
        height: 40
      },
      hotelDetialInfo: {
      },
      queryParams: {
        userId: 0,
        dateBegin: new Date()
      },
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
            date.valueOf() < new Date().valueOf()
          )
        }
      }, // 结束日期设置
      starttime: '', // 开始日期model
      endtime: '' // 结束日期model
    }
  },
  components: {
    headrbar,
    footerbar,
    slide

  },
  methods: {
    ok () {
      this.$router.push({name: 'login'})
    },
    cancle () {
      this.$router.push({name: 'register'})
    },
    checkMap () {
      this.tabCurrntName = 'key3'
      window.scrollTo(100, 600)
    },
    getDetail () {
      GetHotelInfo({
        userId: this.queryParams.userId,
        hotelId: this.$route.query.hotelId,
        dateTime: this.queryParams.dateBegin
      }).then(res => {
        this.spinShow = false
        if (res.data.Code === 200) {
          res.data.Data.GuestRoomType.forEach(item => {
            item.showDetail = false
            item.detail = {}
          })
          let position = res.data.Data.Hotel.Coordinates ? res.data.Data.Hotel.Coordinates.split(',') : []
          this.center.lng = position[0]
          this.center.lat = position[1]
          this.hotelDetialInfo = res.data.Data
        }
      })
    },
    checkDetail (bed, index) {
      this.hotelDetialInfo.GuestRoomType[index].showDetail = false
      if (bed) {
        this.hotelDetialInfo.GuestRoomType[index].showDetail = true
        this.hotelDetialInfo.GuestRoomType[index].detail = bed
      }
    },
    startTimeChange: function (e) {
      if (e) {
      // 设置开始时间
        this.starttime = e
        if (
          new Date(this.endtime).valueOf() > new Date(this.starttime).valueOf()
        ) {
          this.totalNingths = Math.ceil(
            (new Date(this.endtime).valueOf() -
            new Date(this.starttime).valueOf()) /
            (24 * 60 * 60 * 1000)
          )
        } else {
          this.endtime = new Date(new Date(this.starttime).valueOf() + 24 * 60 * 60 * 1000)
        }
        this.queryParams.dateBegin = this.starttime
        if (this.queryParams.dateBegin) {
          this.getDetail()
        }
        this.endTimeOptions = {
          disabledDate: date => {
            let startTime = this.starttime
              ? new Date(this.starttime).valueOf()
              : ''
            return (
              (date && date.valueOf() < startTime) ||
            date.valueOf() > new Date().valueOf() + 90 * 24 * 60 * 60 * 1000 ||
            date.valueOf() < new Date().valueOf()
            )
          }
        }
      }
    },
    endTimeChange: function (e) {
      if (e) {
        // 设置结束时间
        this.endtime = e
        this.totalNingths = Math.ceil(
          (new Date(this.endtime).valueOf() -
          new Date(this.starttime).valueOf()) /
          (24 * 60 * 60 * 1000)
        )
        let endTime = this.endtime
          ? new Date(this.endtime).valueOf() - 1 * 24 * 60 * 60 * 1000
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
      }
    },
    /**
     *房间间预订
     */
    subcrib (bed, index) {
      if (bed.WxIsFull) {
        this.$Message.config({
          top: 450
        })
        this.$Message.destroy()
        this.$Message.warning({content: '该房型已经满房，不能预订!'})
      } else {
        if (this.login) {
          bed.other = this.hotelDetialInfo.GuestRoomType[index]
          let params = {
            startTime: this.starttime,
            endTime: this.endtime,
            totalNingths: this.totalNingths,
            Price: bed.WxPrice,
            hotelName: this.hotelDetialInfo.Hotel.Name,
            payWay: bed.Payway,
            hotelId: this.hotelDetialInfo.Hotel.Id,
            hotelPhone: this.hotelDetialInfo.Hotel.PhoneNumber,
            breakfastInfoName: bed.BreakfastInfo_Name,
            floorRange: bed.FloorRange,
            guestRoomTypeId: bed.GuestRoomTypeId,
            guestRoomTypeName: this.hotelDetialInfo.GuestRoomType[index].GuestRoomType.NameCode,
            zoomArea: bed.Area,
            bedId: bed.Id,
            bedName: bed.BedType_Name,
            address: this.hotelDetialInfo.Hotel.AddressSSQ

          }
          this.$router.push({
            name: 'subscribInfo',
            params: params})
        } else {
          this.modal = true
          this.modalMessage = '订房前请先登录个人信息,若还未有账号请先注册后登录'
        }
      }
    },
    poiSeacher (index) {
      this.keyword = this.btnsText[index]
      this.btnsIndex = index
    }
  },
  mounted () {
    this.starttime = parseTime(new Date(this.queryParams.dateBegin))
    this.endtime = parseTime(new Date(
      this.queryParams.dateBegin.valueOf() + 24 * 60 * 60 * 1000
    ))
    this.login = !!Cookies.get('usertoken')
    this.queryParams.userId = this.login ? JSON.parse(Cookies.get('user')).Id : 0
    this.getDetail()
  }
}
</script>
<style>

.date-item .ivu-form-item-label {
  font-size: 14px;
}
.detailhotel .ivu-tabs-nav-scroll {
  margin-top: 30px;
}
.detailhotel .ivu-tabs-nav .ivu-tabs-tab {
  color: #666;
}
.detailhotel .ivu-tabs-ink-bar {
  background-color: #f94;
}
.detailhotel .ivu-tabs-nav .ivu-tabs-tab-active,
.detailhotel .ivu-tabs-tab:hover {
  color: #333 !important;
}
.detailhotel .ivu-layout-content {
  position: relative;
  top: 0;
  bottom: 0;
  min-height: 100vh;
  width: 100vw;
}
.detailhotel.ivu-tabs{
overflow: visible;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headerbar {
  width: 100%;
  position: relative;
}
.ivu-layout-content {
  background: #fff;
}

img {
  border-radius: 5px;
}
.detail-app {
  width: 1200px;
  margin: 0 auto;
}
.topdesc {
  margin-top: 50px;
  margin-bottom: 20px;
}
.name {
  font-size: 20px;
  font-weight: 500;
  color: #000;
}
.others {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.others > p > span {
  font-size: 14px;
  color: #666;
  margin-right: 20px;
}
.imglist {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.imglist ul {
  display: flex;
  flex-wrap: wrap;
}
.imglist li,
.imglist li img {
  width: 250px;
  height: 170px;
}
.first > img {
  width: 380px;
  height: 352px;
}
.imglist li {
  margin-left: 20px;
  margin-bottom: 10px;
}
table,
table tr th,
table tr td {
  border: none;
  text-align: center;
  padding: 15px 0;
  font-size: 14px;
}
table {
  min-height: 35px;
  line-height: 35px;
  border-collapse: collapse;
}
table .heaadr,
table .heaadr td {
  background: #f5f5f5;
  text-align: center;
  color: #333;
  padding: 0;
  font-size: 14px;
}
.zomm {
  height: 150px;
  display: flex;
}
.zomm img {
  width: 150px;
  height: 150px;
  margin: 0 30px;
}
.tdzoom {
  width: 400px;
  text-align: center;
}
.zomm p {
  margin-top: 30px;
}
.zomm p span {
  display: block;
  font-size: 14px;
}
.zomm p span:first-child {
  font-weight: 500;
  color: #000;
}
.pay img {
  width: 50px;
  height: 40px;
}
.detail {
  padding: 30px 200px 30px 30px;
  background: #f5f5f5;
  margin-bottom: 30px;
  font-size: 14px;
  color: #666;
  position: relative;
}
.detail .base {
  display: flex;
}
.detail .base span {
  flex: 1;
  margin-bottom: 10px;
}
.close {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50px;
  right: 50px;
}
.zoom-list {
  display: flex;
  margin-bottom: 30px;
  align-items:flex-start;
  justify-content: flex-start;
  flex-wrap:wrap;
}
.zoom-list li,
.zoom-list li img {
  width: 215px;
  height: 160px;
}
.zoom-list li  {
  margin-left: 20px;
  margin-top:20px;
}
.titledetail {
  margin: 20px 0;
  font-size: 16px;
  color: #f94;
}
p.desc {
  font-size: 14px;
  line-height: 2;
  margin: 10px 0;
}
.fade-enter-active {
  transition: all 0.4s linear;
  transform: translate3d(0, 0, 0);
}
.fade-enter {
  transform: translate3d(0, -100%, 0);
}
.fade-leave-active {
  transition: all 0.4s linear;
  transform: translate3d(0, -100%, 0);
}
.fade-leave {
  transform: translate3d(0, 0, 0);
}
.posiRes{
position: relative;
top:-94%;
width:40%;
left:60%;
}
.btns{
display: flex;
height: 50px;
line-height:50px;
width:480px;
background:#eee;
position:absolute;
margin-left:720px;
border:1px solid #eee;
justify-content: space-between;
border-bottom:none;
}
.btns li{
  flex:1;
  text-align:center;
  font-size:14px;
cursor: pointer;
}
.btns li.active{
background:#fff;
border-top:2px solid #f94;
}

</style>
