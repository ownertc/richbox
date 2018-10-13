<template>
<ul class="navbar-app">
  <li class="logo"><img :src="logo" alt=""></li>
  <li><router-link :to="{name:'index'}" style="color:#fff;display:block;height:50px;line-height:50px">首页</router-link></li>
  <li><router-link :to="{name:'list'}"  style="color:#fff;display:block;height:50px;line-height:50px">酒店预订</router-link></li>
  <li><router-link :to="{name:'inteexplan'}" style="color:#fff;display:block;height:50px;line-height:50px">会员专享</router-link></li>
  <li class="tel" style="line-height:50px">服务热线：021-51695978</li>
  <li class="bar-right">
    <div v-if="!login">
    <span><router-link :to="{name:'login'}" style="color:#fff;display:inline-block;height:50px;line-height:50px">登录</router-link></span>
    <span>|</span><span><router-link :to="{name:'register'}"  style="color:#fff;display:inline-block;height:50px;line-height:50px;">注册</router-link></span>
    </div>
    <Dropdown v-if="login" style="margin-top:10px">
        <a href="javascript:void(0)" style="color:#fff">
            {{userInfo.Name}}
            <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list" class="tablist">
            <DropdownItem><router-link  to="/member/index"  style="color:#333"> {{userInfo.Name}}({{userInfo.VipLevelName}})</router-link></DropdownItem>
            <DropdownItem><router-link  to="/member/center"  style="color:#333">会员中心</router-link></DropdownItem>
            <DropdownItem><router-link  to="/member/order" style="color:#333">我的订单</router-link></DropdownItem>
            <DropdownItem ><span @click="loginOut()">退出登录</span></DropdownItem>
        </DropdownMenu>
    </Dropdown>
  </li>
</ul>
</template>
<script>
import Cookies from 'js-cookie'
import logo from '@/assets/images/logo.png'
import {getUserInfo} from '@/api/user'

export default {
  data: function () {
    return {
      logo,
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
      this.login = true
      getUserInfo().then(res => {
        if (res.data.Code === 200) {
          if (this.userInfo) {
            this.userInfo = res.data.Data

            Cookies.set('user', JSON.stringify(res.data.Data), {
              expires: 1
            })
          } else {
            this.loginOut()
          }
        }
      })
    }
  }
}
</script>
<style scope>
.navbar-app{
width:100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  color:#fff;
}
.navbar-app li{
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding:0 20px;
  font-size: 14px;
}
.navbar-app li.tel{
margin-left: 200px;
}
.logo img{
width:120px;
height:30px;
margin-top: 10px;

}
.bar-right span{
margin: 0 5px;
}
a:hover,a {
    color: #fff;

}
</style>
