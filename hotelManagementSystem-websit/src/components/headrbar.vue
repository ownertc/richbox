<template>
<div style="width:100vw;background:#000;height:80px">
<ul class="header-app" :style="{ backgroundImage: 'url(' + bgblack + ')'}">
  <li class="logo" ><img :src="logo" alt=""></li>
  <li><router-link  to="/" style="color:#fff">首页</router-link></li>
  <li><router-link  to="/list" style="color:#fff">酒店预订</router-link></li>
  <li class=""><router-link  to="/inteexplan" style="color:#fff">会员专享</router-link></li>
  <li class="tel">服务热线：021-51695978</li>
  <li class="bar-right">
  <div v-if="!login">
    <span><router-link :to="{name:'login'}" style="color:#fff;display:inline-block;height:50px;line-height:50px">登录</router-link></span>
    <span>|</span><span><router-link :to="{name:'register'}"  style="color:#fff;display:inline-block;height:50px;line-height:50px;">注册</router-link></span>
   </div>
    <Dropdown v-if="login">
        <a href="javascript:void(0)" style="color:#fff">
            {{userInfo.Name}}
            <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list" class="tablist">
            <DropdownItem>{{userInfo.Name}}({{userInfo.VipLevelName}})</DropdownItem>
            <DropdownItem><router-link  to="/member/center" >会员中心</router-link></DropdownItem>
            <DropdownItem><router-link  to="/member/order">我的订单</router-link></DropdownItem>
            <DropdownItem ><span @click="loginOut()">退出登录</span></DropdownItem>
        </DropdownMenu>
    </Dropdown>
    </li>
</ul>
</div>
</template>
<script>
import logo from '@/assets/images/logo.png'
import bgblack from '@/assets/images/bgblack.png'
import Cookies from 'js-cookie'
import {getUserInfo} from '@/api/user'
export default {
  data: function () {
    return {
      logo,
      bgblack,
      login: false,
      userInfo: {}
    }
  },
  methods: {
    loginOut () {
      Cookies.remove('user')
      Cookies.remove('usertoken')
      this.$router.push({'name': 'login'})
      window.login = false
    }
  },
  mounted () {
    if (Cookies.get('usertoken')) {
      getUserInfo().then(res => {
        if (res.data.Code === 200) {
          this.userInfo = res.data.Data
          if (this.userInfo) {
            Cookies.set('user', JSON.stringify(res.data.Data), {
              expires: 1
            })
            this.login = true
          } else {
            this.loginOut()
          }
        }
      })
    }
  }
}
</script>
<style scoped>
.header-app{
  width: 1200px;
  height:80px ;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color:#fff;
}
.header-app>li{
  height: 80px;
  line-height: 60px;
  text-align: center;
  font-size: 14px;
}
.logo img{
width:120px;
height:30px;
margin-top: 20px;

}
.bar-right span{
margin: 0 5px;
}
.header-app li.tel{
margin-left: 400px;
}
a:hover,a {
    color: #fff;

}
.tablist a:hover,.tablist a{
color: #333;
}

</style>
