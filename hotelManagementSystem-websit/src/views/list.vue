<template>
    <Layout style="overflow-x:hidden">
        <Header  class="headerbar">
            <div @click="closeDate()"><index-hear class="header-bg" :bg="headerbg"  :modal="false"></index-hear></div>
            <serch-btn class="serch-bth" @daySelect="daySelect" @seacher="seacher" @getCity="getCity"  ref="sercher"></serch-btn>
            <navbar class="navbar"></navbar>
        </Header>
        <Content>
          <div class="content" @click="closeDate()">
            <ul class="lists">
                <li v-for="(item,index) in list" :key="index" >
                   <div class="baseinfo">
                       <div class="one">
                         <img :src="item.PicPath" alt="" @click="getDetail(item,index)">
                       </div>
                        <div class="two">
                           <p class="name">{{item.Name}}</p>
                           <p class="address">地址：{{item.AddressInfo}}</p>
                           <p class="address">电话：{{item.PhoneNumber}}</p>
                           <Button type="warning" class="check" > <router-link :to="{path:'/detail', query:{hotelId:item.Id}}" style="color:#fff">查看详情</router-link></Button>
                        </div>
                        <div class="three">
                           <p class="price"><span>￥</span><span>{{item.MinPirce}}</span><span>起</span></p>
                           <p style="font-size:14px;color:#999;margin-top:10px;cursor:pointer" v-if="!item.detailShow" @click="getDetail(item,index)">查看全部房型<Icon type="ios-arrow-down" /></p>
                           <p style="font-size:14px;color:#999;margin-top:10px;cursor:pointer"  v-if="item.detailShow" @click="getDetail(item,index)">收起全部房型详情<Icon type="ios-arrow-up" /></p>
                        </div>
                   </div>
              <div v-if="item.detailShow">
                <table width="100%"  v-for="(item1,index1) in detailInfo[index]['GuestRoomType']" :key="index1">
                    <tr class="heaadr" v-if="index1==0"><td style="width:398px">房型</td><td style="width:149px">床型</td><td style="width:120px">早餐</td><td style="width:120px">取消规则</td><td style="width:120px">挂牌价</td><td style="width:150px">官网预订价</td><td style="width:200px"></td></tr>
                    <tr v-for="(bed,index2) in item1.GuestRooms" :key="index2">
                    <td :rowspan="item1.GuestRooms.length" class="tdzoom" v-if="index2==0" style="width:400px"><p style="text-align:center"><span>{{item1.GuestRoomType.NameCode}}</span></p></td>
                    <td style="width:150px">{{bed.BedType_Name}}</td><td style="width:120px">{{bed.BreakfastInfo_Name}}</td>
                    <td style="width:120px"><span v-if="bed.Payway=='GPAZXF0001'">不可取消</span><span v-if="bed.Payway!='GPAZXF0001'">免费取消</span></td>
                    <td style="width:120px">￥{{bed.Price}}</td>
                    <td style="width:150px"><span v-if="!login"><router-link to="/login" style="color:#666">会员登录后可见</router-link></span><span v-if="login">￥{{bed.WxPrice}}</span></td>
                    <td class="pay" style="width:200px">
                        <img :src="xian" alt="" v-if="bed.Payway=='GPAZXF0001'&&!bed.WxIsFull" @click="goSubcrib(bed,index,index1)">
                        <img :src="fullXian" alt="" v-if="bed.Payway=='GPAZXF0001'&&bed.WxIsFull" @click="goSubcrib(bed,index,index1)">
                        <img :src="dian" alt="" v-if="bed.Payway!='GPAZXF0001'&&!bed.WxIsFull"    @click="goSubcrib(bed,index,index1)">
                        <img :src="fullDian" alt="" v-if="bed.Payway!='GPAZXF0001'&&bed.WxIsFull" @click="subcrib(bed,index,index1)">
                      </td>
                    </tr>

                </table>
                   </div>
                </li>
            </ul>
             <P style="color:#666;text-align:center;height:50px;line-height:50px;font-size:14px" v-if="queryParams.pageIndex<=maxPage">加载更多</P>
             <P style="color:#666;text-align:center;height:50px;line-height:50px;font-size:14px" v-if="queryParams.pageIndex>maxPage">没有更多数据！</P>
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
import indexHear from '@/components/indexHear'
import serchBtn from '@/components/serchBtn'
import navbar from '@/components/navbar'
import footerbar from '@/components/footerbar'
import Cookies from 'js-cookie'

// images

import headerbg from '@/assets/images/listbg.png'
import hold from '@/assets/images/timg.jpg'
import dian from '@/assets/images/dian.png'
import xian from '@/assets/images/xian.png'
import fullDian from '@/assets/images/full-dian.png'
import fullXian from '@/assets/images/full-xian.png'
// api
import { getHotelList, GetHotelInfo } from '@/api/hotel'
import {parseTime} from '@/utils/index'
export default {
  data () {
    return {
      headerbg,
      hold,
      dian,
      xian,
      fullXian,
      fullDian,
      sw: true,
      modal: false,
      modalMessage: '',
      maxPage: 1,
      list: [],
      spinShow: true,
      login: false,
      detailInfo: [],
      currIndex: 0,
      queryParams: {
        areaId: 0,
        dateBegin: parseTime(new Date()),
        dateEnd: parseTime(new Date(new Date(parseTime(new Date())).valueOf() + 24 * 60 * 60 * 1000)),
        userId: '0',
        pageIndex: 1,
        pageSize: 10
      }
    }
  },
  computed: {
    totalNingths () {
      let total = Math.ceil((new Date(this.queryParams.dateEnd).valueOf() - new Date(this.queryParams.dateBegin).valueOf()) / 24 / 60 / 60 / 1000)
      return total
    }
  },
  methods: {
    ok () {
      this.$router.push({name: 'login'})
    },
    cancle () {
      this.$router.push({name: 'register'})
    },
    closeDate () {
      if (this.$refs.sercher) {
        if (this.$refs.sercher.datepicker) {
          this.$refs.sercher.datepicker = false
        }
      }
    },
    getCity (id) {
      this.queryParams.areaId = id
    },
    getDetail (item, index) {
      GetHotelInfo({
        userId: this.queryParams.userId,
        hotelId: item.Id,
        dateTime: this.queryParams.dateBegin
      }).then(res => {
        if (res.data.Code === 200) {
          item.detailShow = !item.detailShow
          this.detailInfo[index] = res.data.Data
        }
      })
    },
    seacher () {
      this.maxPage = 1
      this.queryParams.pageIndex = 1
      this.list = []
      this.queryList()
    },
    goSubcrib (bed, index, index1) {
      if (bed.WxIsFull) {
        this.$Message.config({
          top: 450
        })
        this.$Message.destroy()
        this.$Message.warning({content: '该房型已经满房，不能预订!'})
      } else {
        if (this.login) {
          let params = {
            startTime: this.queryParams.dateBegin,
            endTime: this.queryParams.dateEnd,
            totalNingths: this.totalNingths,
            Price: bed.WxPrice,
            hotelName: this.list[index].Name,
            payWay: bed.Payway,
            hotelId: this.list[index].Id,
            hotelPhone: this.list[index].PhoneNumber,
            breakfastInfoName: bed.BreakfastInfo_Name,
            floorRange: bed.FloorRange,
            guestRoomTypeId: bed.GuestRoomTypeId,
            guestRoomTypeName: this.detailInfo[index].GuestRoomType[index1].GuestRoomType.NameCode,
            zoomArea: bed.Area,
            bedId: bed.Id,
            bedName: bed.BedType_Name,
            address: this.list[index].AddressInfo
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
    queryList () {
      if (this.queryParams.pageIndex <= this.maxPage) {
        this.spinShow = false
        this.sw = false
        this.queryParams.dateBegin = parseTime(new Date(this.queryParams.dateBegin))
        this.queryParams.dateEnd = parseTime(new Date(this.queryParams.dateEnd))
        getHotelList(this.queryParams).then(res => {
          if (res.data.Code === 200) {
            res.data.Data.List.forEach(item => {
              item.detailShow = false
            })
            this.list = this.list.concat(res.data.Data.List)
            this.maxPage = Math.ceil(
              res.data.Data.Count / this.queryParams.pageSize
            )
            this.queryParams.pageIndex++
            this.sw = true
          }
        })
      }
    },
    daySelect (type, date) {
      if (type === 1) {
        this.queryParams.dateBegin = new Date(date)
      } else if (type === 2) {
        this.queryParams.dateEnd = new Date(date)
      }
    }
  },
  components: {
    indexHear,
    serchBtn,
    navbar,
    footerbar
  },
  created () {
    window.onscroll = function () {
      // 变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      // 变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight
      // 变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight
      // 滚动条到底部的条件
      if (scrollTop + windowHeight >= scrollHeight - 50) {
        // 写后台加载数据的函数
        if (this.sw) {
          this.queryList()
        }
      }
    }
  },
  mounted () {
    this.login = !!Cookies.get('usertoken')
    this.queryParams.userId = this.login ? JSON.parse(Cookies.get('user')).Id : 0
    this.queryList()
  }
}
</script>
<style>
.detailhotel .ivu-tabs{
  overflow:auto !important;

}
</style>

<style scoped>
.ivu-layout-content {
  background: #fefefe;
}
.logo img {
  margin-top: 0;
}
.ivu-layout-content {
  position: relative;
  top: 0;
  bottom: 0;
  min-height: 100vh;
  width: 100vw;
}
.headerbar {
  width: 100%;
  height: 400px;
  position: relative;
}
.header-bg {
  position: absolute;
  top: 0;
  left: 0;
}
.serch-bth {
  position: absolute;
  left: 0;
  bottom: 100px;
  z-index: 999;
}
.navbar {
  position: absolute;
  left: 0;
  top: 10px;
  z-index: 999;
}
.content {
  width: 1200px;
  margin: 0 auto;
}
.lists li {
  background: #fff;
  margin-top: 15px;
}
.baseinfo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 300px;
  border: 1px solid #eeeeee;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
}
.one img {
  width: 300px;
  height: 200px;
  border-radius: 10px;
  margin-left: 30px;
}
.two {
  flex: 1;
  margin-left: 20px;
}
.name {
  font-size: 16px;
  color: #000;
  margin-bottom: 5px;
}
.address {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}
.three {
  margin-right: 30px;
}
.check {
  font-size: 14px;
  padding: 5px 20px;
  letter-spacing: 2px;
  margin-top: 10px;
}
.price span:nth-child(2n + 1) {
  font-size: 14px;
  color: #666;
}
.price span:nth-child(2n) {
  font-size: 22px;
  color: #f94;
}
table,
table tr th,
table tr td {
  border: 1px solid#eee;
  text-align: center;
  padding: 3px;
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
  color: #333;
  font-size: 14px;
}

.tdzoom {
  text-align: center;
}
.tdzoom p {
  margin-top: 30px;
}
.tdzoom p span {
  display: block;
  font-size: 14px;
  align-items: center;
  justify-content: center;
}
.tdzoom p span:first-child {
  font-weight: 500;
  color: #000;
}
.pay img {
  width: 50px;
  height: 40px;
}
</style>
