
<template>
    <Layout>
        <Header  class="headerbar">
            <headrbar></headrbar>
        </Header>
        <Content>
            <div class="content">
             <ul class="left">
                <li><router-link to="/member/index">我的德途 </router-link></li>
                <li><router-link to="/member/center">会员中心 </router-link></li>
                <li><router-link to="/member/order">我的订单 </router-link></li>
                <li><router-link to="/member/usalInfo">常用信息 </router-link></li>
                <li><router-link to="/member/voucher">抵用券 </router-link></li>
             </ul>
             <div class="right">
                 <transition name='slide-fade' keep-alive>
                 <router-view></router-view>
                 </transition>
             </div>
            </div>
        </Content>
        <Footer><footerbar></footerbar></Footer>
    </Layout>

</template>

<script>

import hold from '@/assets/images/timg.jpg'
import headrbar from '@/components/headrbar'
import footerbar from '@/components/footerbar'
export default {
  data () {
    return {
      hold,
      userInfo: {}
    }
  },
  components: {
    headrbar,
    footerbar
  }
}
</script>

<style scoped>

.ivu-layout-content{
    position: relative;
    top:0;
    bottom: 0;
    min-height: 76vh;
    width: 100vw;
}
.headerbar{
    width: 100%;
    position: relative;
}
.content{
width:1200px;
margin: 0 auto;
display: flex;
justify-content: space-between;
}
.left{
width:400px;
margin-top:50px;
}
.left li{
    text-align: center;
    font-size: 14px;
    color:#333;
    height: 60px;
    line-height: 60px;
    width:100%;
}
a:hover,a {
    color: #333;

}
.router-link-active{
color: #f94
}
.right{
    width:800px;
}
.slide-fade{
  position: absolute;left:0;right: 0;
}
.slide-fade-enter-active {
  transition: all 1.2s ease;
}
.slide-fade-leave-active {

  transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
  left:0;right: 0;
  transform: translateX(50px);
  opacity: 0;
}
</style>
