<template>
  <div class="intro-warp">
     <ul class="navbar">
       <li :class="{active:currTab==0}" @click="currTab=0">设施服务</li>
       <li :class="{active:currTab==1}" @click="currTab=1">酒店介绍</li>
     </ul>
     <div class="line"></div>
     <div class="ccc">
        <div class="tabone" v-if="currTab==0">
          <div v-for="(item,index) in configTree" :key="index">
            <p class="title">{{item.Value}}</p>
              <ul class="facilities-list">
                <li class="fa-item" v-for="(item1,index1) in item.Children" :key="index1"><img :src="item1.Expand" style="width:40rpx;height:40rpx"><span>{{item1.Value}}</span></li>
              </ul>
             </div>
        </div>
        <div class="tabtwo" v-if="currTab==1">
            <p class="intro">{{intro}}</p>
        <div class="tel" @click="phoneDetail=true"><i class="fa fa-volume-control-phone fa-lg" ></i><span>联系电话</span></div>
        <div class="phone-wrap" v-if="phoneDetail">
            <div class="phone-detail">
                <p class="phone-title">联系电话</p>
                <div class="line"></div>
                <p class="phone-content"><span>固定电话</span><span>{{tel}}</span></p>
                <div class="line"></div>
                <p class="cancle" @click="phoneDetail=false">取消</p>
              </div>
          </div>
        </div>
     </div>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      currTab: 0,
      phoneDetail: false,
      configTree: [],
      intro: '',
      tel: ''
    }
  },
  methods: {
  },
  onLoad () {
    this.configTree = JSON.parse(this.$root.$mp.query.configTree)
    this.tel = this.$root.$mp.query.tel
    this.intro = this.$root.$mp.query.intro
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
  font-size: 32rpx;
  color:#666;
  width: 30vw;
  height: 100%;
  margin: 0 5vw;
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
.facilities-list{
  display: flex;
   flex-wrap: wrap;
   padding: 0 0 0 60rpx;
}
.fa-item{
  align-items: center;
  justify-content: flex-start;
  color:#999;
  font-size:26rpx;
  display: flex;
  flex-direction: column;
  margin:20rpx 40rpx 20rpx 0;
}
.fa-item i{
  font-size: 40rpx;
}
.title{
  font-size: 32rpx;
  color:#666;
  margin: 20rpx 0;
  padding: 0 30rpx
}
.intro{
  font-size: 30rpx;
  color:#666;
  line-height: 1.5;
  letter-spacing: 2px;
  padding: 30rpx 30rpx 130rpx 30rpx;
}
.tel{
  display: flex;
  align-items: center;
  justify-content: center;
  width:100vw;
  background: rgba(255, 255, 255, 0.9);
  height: 100rpx;
  font-size: 32rpx;
  color:#333;
  position: fixed;
  bottom: 0;
  left: 0;

}
.tel i{
  font-size: 40rpx;
  color:#ff2d50;
  margin-right: 30rpx;
}
.phone-wrap{
  position: fixed;
  top:0;
  bottom:0;
  height: 100%;
  background: rgba(0,0,0,.5);
  z-index: 999999;
  filter: blur(0.5);
  width: 100vw;
}
.phone-detail{
  position: absolute;
  bottom: 0;
  background: #fff;
  width: 100vw;
}
.phone-title{
  text-align: center;
  font-size: 30rpx;
  line-height: 3;
}
.phone-content{
  padding: 30rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  font-size: 32rpx;
}
.phone-content span:nth-child(1){
  color:#666;
}
.cancle{
  padding: 30rpx 0 ;
  font-size: 30rpx;
  text-align: center;
}
</style>
