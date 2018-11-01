<template>
  <div class="intro-warp">
     <ul class="navbar">
       <li :class="{active:currTab==-1}" @click="selectAblums(-1)">全部</li>
       <li :class="{active:currTab==index}" @click="selectAblums(index)" v-for="(item,index) in AblumsTypes" :key="index">{{item.PicType_Name}}</li>
     </ul>
     <div class="line"></div>
     <div class="ccc">
       <ul class="pohotolist">
        <li v-for="(Ablum,index) in AblumsSwiper" :key="index" @click="swiperStatus=true">
           <img :src="Ablum.PicPath" alt="">
           <span class="marker">{{Ablum.PicType_Name}}</span>
         </li> 
       </ul>
     </div>
    <div class="swipe" v-if="swiperStatus">
    <p style="margin-top:25%">{{current+1}}/{{AblumsSwiper.length}}</p>
      <swiper :indicator-dots="false" :autoplay="true" style="height:70vw" @change="swiprerChange($event)">
        <block v-for="(item,index) in AblumsSwiper" :key="index">
          <swiper-item>
            <image :src="item.PicPath" class="slide-image" style="width:100vw;height:70vw"/>
          </swiper-item>
     
      </block>
    </swiper>
      <p><span>{{currPicName}}</span></p>
      <P><i class="fa fa-remove"  @click="swiperStatus=false"></i></P>
  </div>
  </div>

</template>

<script>

export default {
  data () {
    return {
      current: 0,
      swiperStatus: false,
      currTab: 1,
      Ablums: [],
      currPicName: '',
      AblumsTypes: [],
      AblumsSwiper: []
    }
  },
  methods: {
    swiprerChange (e) {
      this.current = e.target.current
      this.currPicName = this.AblumsSwiper[this.current]['PicType_Name']
    },
    selectAblums (index) {
      this.currTab = index
      if (this.currTab === -1) {
        this.AblumsSwiper = this.Ablums
      } else {
        this.AblumsSwiper = this.AblumsTypes[index].Albums
      }
    }
  },
  onLoad () {
    let data = this.$root.$mp.query.AblumsTypes
    let data1 = this.$root.$mp.query.Ablums
    this.AblumsTypes = JSON.parse(data)
    this.Ablums = JSON.parse(data1)
    this.currTab = -1
    this.AblumsSwiper = this.Ablums
  }
}
</script>

<style scope>
.navbar{
  padding:0 30rpx;
  display: flex;
  justify-content: center;
  align-items: center
}
.navbar li{
  text-align: center;
  font-size: 30rpx;
  color:#666;
  height: 101%;
  padding: 0 5vw;
  line-height:3;
}
.navbar li.active{
   border-bottom:3px solid #ff2d50;
   color: #000;
}
.line{
  width:100vw;
  height: 2px;
  background:  #ccc;
  transform: scaleY(0.2);
}
.pohotolist{
  width: 100vw;
  margin-top: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

}
.pohotolist li{
  flex:1;
  position: relative;
}
.pohotolist li img{
  width: 45vw;
  height: 45vw;
  border-radius: 5vw;
  margin-left: 3vw;
  margin-bottom: 30rpx;
}
.marker{
  position: absolute;
  bottom: 5vw;
  left:3vw;
  color:#fff;
  padding: 10rpx 30rpx;
  font-size: 26rpx;
  border-bottom-left-radius: 5vw;
  background: #000;
  opacity: 0.5;
}
.swipe{
  position: fixed;
  top:0;
  bottom: 0;
  z-index: 999;
  height: 100%;
  background: #000;
  width: 100vw;
  color:#fff;
}
.swipe p{
  font-size: 30rpx;
  text-align: center;
  padding: 40rpx 0;
}
.swipe p i{
  font-size: 50rpx;
}
</style>
