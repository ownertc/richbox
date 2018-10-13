<template>
  <ul  class="tabbar-box" >
     
        sss
  </ul>
</template>

<script>

export default {
  data () {
    return {
      navList: [{
        text: '首页'
      }, {text: '我的'}]
    }
  },
  computed: {

  },
  mounted () {
    console.log('c')
  }
}
</script>

<style>
.tabbar-box{
  width: 100%;
  height: 96rpx;
  position: fixed;
  bottom:0;
  left:0;
  z-index: 999999;
  border-top:1rpx solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  background:#fefefe;
  color: #666;
  font-size: 30rpx;
}
.nav{
  flex:1;
}
.nav a{
   width: 100%;
  text-align: center;
  font-size: 32rpx;
  color:#444;
  height: 96rpx;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
i{
  font-size: 50rpx;
  color:#666;
}
</style>
