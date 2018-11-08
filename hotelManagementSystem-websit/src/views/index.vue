<template>
<div >
    <Layout  style="overflow-x:hidden">
        <Header  class="headerbar">
            <div  @click="test($event)"><index-hear class="header-bg" :bg="bg" :modal="true"></index-hear></div>
            <serch-btn class="serch-bth" @daySelect="daySelect" @seacher="seacher" ref="sercher"></serch-btn>
            <navbar class="navbar"  @click="test($event)">></navbar>
        </Header>
        <Content>
          <div class="content" @click="test($event)">
            <ul class="lists-one">
                <li>
                    <img :src="one1" alt="">
                    <div class="right">
                        <p>公共空间</p>
                        <p><span>独特设计</span><span>享受时尚</span></p>
                    </div>
                </li>
              <li>
                    <img :src="one2" alt="">
                    <div class="right">
                        <p>舒适客房</p>
                        <p><span>靓丽空间</span><span>雅致品味</span></p>
                    </div>
                </li>
                <li>
                    <img :src="one3" alt="">
                    <div class="right">
                        <p>会议空间</p>
                        <p><span>轻松便捷的会议环境齐备</span></p>
                    </div>
                </li>
                 <li>
                    <img :src="one4" alt="">
                    <div class="right">
                        <p>贴心服务</p>
                        <p><span>人性化设施更添温馨</span></p>
                    </div>
                </li>
            </ul>
            <div class="subcribe">
                <p class="title">酒店预订</p>
                <router-link to="/list" class="more">更多</router-link>
                <ul class="list-two">
                    <li v-for="(item,index) in list" :key="index">
                        <router-link :to="{path:'/detail', query:{hotelId:item.Id}}"  ><div class="top"><span class="name">{{item.Name}}</span><img :src="item.PicPath" alt=""></div></router-link>
                       <div class="bottom">
                           <p class="address1">{{item.AddressInfo}}</p>
                           <p class="address2"><span>{{item.CoordinatesDescription}}</span></p>
                          <router-link :to="{path:'/detail', query:{hotelId:item.Id}}"  class="check">查看酒店&gt;</router-link>

                       </div>
                    </li>
                </ul>
            </div>
            <div class="food">
                <p class="title">畅享美食</p>
                <Carousel autoplay v-model="value2" loop>
                        <CarouselItem>
                            <div class="demo-carousel">
                                <img :src="food1" alt="">
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel">
                                 <img :src="food2" alt="">
                            </div>
                        </CarouselItem>

                </Carousel>
            </div>
             <div class="commit">
                <p class="title">会议宴会</p>
                <ul class="lsit-three">
                    <li><img :src="yanhui1" alt=""></li>
                    <li><img :src="yanhui2" alt=""></li>
                    <li><img :src="yanhui3" alt=""></li>
                    <li><img :src="yanhui4" alt=""></li>
                     <li><img :src="yanhui5" alt=""></li>
                </ul>
            </div>
          </div>
          <div class="member"  :style="{ backgroundImage: 'url(' + join + ')'}" @click="test($event)">
              <span class="meber-desc">加入德途会员,畅想惊喜不断</span>
              <router-link to="/inteexplan" ><span class="check-detail">查看详情</span></router-link>
          </div>
        </Content>
        <Footer><footerbar></footerbar></Footer>
             <Spin size="large" fix v-if="spinShow" style="z-index:9999"></Spin>
    </Layout>
</div>
</template>

<script>
import indexHear from '@/components/indexHear'
import serchBtn from '@/components/serchBtn'
import navbar from '@/components/navbar'
import footerbar from '@/components/footerbar'

// images
import bg from '@/assets/images/indexhear.png'
import one1 from '@/assets/images/one1-1.png'
import one2 from '@/assets/images/one1-2.png'
import one3 from '@/assets/images/one1-3.png'
import one4 from '@/assets/images/one1-4.png'
import headerbg from '@/assets/images/1d.jpg'
import food from '@/assets/images/food.png'
import join from '@/assets/images/join.png'
import food1 from '@/assets/images/food1.png'
import food2 from '@/assets/images/food2.png'
import yanhui1 from '@/assets/images/yanhui1.png'
import yanhui2 from '@/assets/images/yanhui2.png'
import yanhui3 from '@/assets/images/yanhui3.png'
import yanhui4 from '@/assets/images/yanhui5.png'
import yanhui5 from '@/assets/images/yanhui6.png'
// apis
import {getHotelListHome} from '@/api/hotel'

export default {
  data () {
    return {
      one1,
      one2,
      one3,
      one4,
      headerbg,
      food,
      join,
      bg,
      food1,
      food2,
      yanhui1,
      yanhui2,
      yanhui3,
      yanhui4,
      yanhui5,
      value2: 0,
      spinShow: true,
      query: {
        dateBegin: '',
        dateEnd: ''
      },
      list: []
    }
  },
  components: {
    indexHear,
    serchBtn,
    navbar,
    footerbar
  },
  methods: {
    test (e) {
      if (this.$refs.sercher) {
        if (this.$refs.sercher.datepicker) {
          this.$refs.sercher.datepicker = false
        }
      }
    },
    seacher () {
      this.getHotelList()
      this.$router.push({name: 'list'})
    },
    getHotelList () {
      getHotelListHome().then(res => {
        this.spinShow = false
        if (res.data.Code === 200) {
          this.list = res.data.Data
        }
      })
    },
    daySelect (type, date) {
      if (type === 1) {
        this.query.dateBegin = date
      } else if (type === 2) {
        this.query.dateEnd = date
      }
    }
  },
  mounted () {
    console.log(this)
    this.getHotelList()
  }
}
</script>
<style scoped>
.logo img{
    margin-top:0;
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
    height: 400px;
    position: relative;
}
.header-bg{
    position: absolute;
    top:0;
    left: 0;
}
.serch-bth{
position: absolute;
left:0;
bottom: 100px;
z-index: 999
}
.navbar{
position: absolute;
left:0;
top: 10px;
z-index: 999
}
.content{
width:1200px;
margin: 0 auto;
}
.lists-one{
 display: flex;
align-items: center;
justify-content: center;
padding: 50px 0 0 0;
}
.lists-one li{
    flex:1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.lists-one .right{
margin-left: 10px;
}
.lists-one .right p:nth-child(1){
    font-size: 14px;
    color:#333;
}
.lists-one .right p:nth-child(2){
 font-size: 14px;
    color:#666;
}
.lists-one .right p:nth-child(2) span{
    margin-right: 10px;
}
.title{
font-size: 18px;
font-weight: 500;
text-align: center;
color:#000;
letter-spacing: 3px;
padding-top:80px;
padding-bottom: 40px;
}
.more{
text-align: right;
color: #666;
font-size: 14px;
margin-right: 60px;
padding-bottom: 20px;
display: block;
width:100%;
}
.list-two{
display: flex;
}
.list-two li{
 width: 377px;
 border:1px solid #eee;
}
.list-two li:hover{
    box-shadow: 0px 2px 5px rgba(147, 147, 147, 0.3)
}
.list-two li+li{
  margin-left:25px;

}
.list-two .top{
    position: relative;
    overflow: hidden;

}
.list-two .top,.list-two .top img{
    width: 377px;
    height: 254px;
    margin: 0;
    padding: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    transition: all 1s;
}
.list-two .top img:hover{
    transform: scale(1.2);
}
.list-two .top span{
    position: absolute;
    top:200px;
    left:-3px;
    background: #D89A40;
    color:#fff;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1px;
    padding:5px 15px;
}
.bottom{
background: #fff;
height: 100px;
}
.address1,.address2,.check{
display: block;
font-size:16px;
color:#333;
width: 377px;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
margin:5px 0;
text-indent: 20px;
}
.address2{
font-size: 14px;
color:#666;
}
.check{
font-size: 14px;
color:#999;
margin-top: 10px;
}
.food-img img{
width: 1200px;
height: 300px;
}
.lsit-three{
    display: flex;
}
.lsit-three li{
    overflow: hidden;
}
.lsit-three li,.lsit-three li img{
    width:233px;
    height: 355px;
    border-radius: 5px;
    transition: all 1s;
}
.lsit-three li:hover{
box-shadow: 0 2px 5px  rgba(147,147,147,0.5)
}
.lsit-three li img:hover{
transform: scale(1.2)
}
.lsit-three li+li{
margin-left: 10px;
}
.demo-carousel:nth-child(2n){
    width: 100%;
    height: 400px;
    background: #D89A40;
}
.demo-carousel:nth-child(2n+1){
    width: 100%;
    height: 400px;
    background:navajowhite;
}
.member{
    width: 100%;
    margin: 40px 0;
    height: 150px;
}
.meber-desc{
    color: #fff;
    font-size: 40px;
    line-height: 150px;
    margin-left:500px;
    letter-spacing: 2px;
}
.check-detail{
    font-size: 15px;
    padding: 10px 25px;
    border:1px solid #fff;
    border-radius: 5px;
    color:#fff;
    letter-spacing: 2px;
    margin-left: 130px;
}
</style>
