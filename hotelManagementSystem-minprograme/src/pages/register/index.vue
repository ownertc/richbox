<template>
  <ul>
    <li><input type="text" placeholder="请输入真实姓名" v-model="registerInfo.Name" @input="validName()"></li>
    <li class="err" style="color:red;font-size:26rpx" v-if="registerInfoErr.Name">{{registerInfoErr.Name}}</li>
    <li><input type="text" placeholder="请输入手机号" v-model="registerInfo.Mobile" @input="validMobile()"></li>
    <li class="err" style="color:red;font-size:26rpx" v-if="registerInfoErr.Mobile">{{registerInfoErr.Mobile}}</li>
    <li class="code"><input type="text" placeholder="验证码" v-model="ValidateCode"><span  @click="validCode()" style="z-index:999" v-if="buttonSend">获取验证码</span><span v-if="!buttonSend">{{timeTotal}}s后重新发送</span></li>
    <li style="margin-top:40rpx;z-index:9999999"><input type="password" placeholder="请输入密码" v-model="registerInfo.PassWord" @input="validPassword()"></li>
     <li class="err" style="color:red;font-size:26rpx" v-if="registerInfoErr.PassWord">{{registerInfoErr.PassWord}}</li>
    <li  ><button @click="register">登录</button></li>
    <li style="font-size:28rpx;width:80%;margin-top:50rpx;"> <checkbox color="red" :checked="agreement" @click="agreement=!agreement"/>我已阅读 <a style="color:#ff2d50" href="/pages/agreement/main">《德途酒店协议》</a></li>
  </ul>
</template>

<script>
import {getCode, registeUser} from '@/utils/api'
import md5 from 'md5'
export default {
  data () {
    return {
      agreement: false,
      ValidateCode: '',
      timeTotal: 60,
      buttonSend: true,
      registerInfo: {
        Name: '',
        Mobile: '',
        PassWord: '',
        OpenId: ''
      },
      registerInfoErr: {
        Mobile: ''
      }
    }
  },
  methods: {
    validCode () {
      this.validMobile()
      if (!this.registerInfoErr.Mobile) {
        getCode({System: 'User', Mobile: this.registerInfo.Mobile, Type: 'Register'}).then(res => {
          if (res.Code === 200) {
            wx.showToast({
              title: '验证码已发送', // 提示的内容,
              icon: 'none', // 图标,
              duration: 2000, // 延迟时间,
              mask: true, // 显示透明蒙层，防止触摸穿透,
              success: res => {}
            })
            this.buttonSend = false
            this.timeTotal = 60
            let interId = setInterval(() => {
              if (this.timeTotal >= 1) {
                this.timeTotal -= 1
              } else {
                clearInterval(interId)
                this.buttonSend = true
              }
            }, 1000)
          } else {
            wx.showToast({
              title: res.ShowData, // 提示的内容,
              icon: 'none', // 图标,
              duration: 2000, // 延迟时间,
              mask: true, // 显示透明蒙层，防止触摸穿透,
              success: res => {}
            })
          }
        })
      }
    },
    validMobile () {
      this.registerInfo.Mobile = this.registerInfo.Mobile.trim()
      if (!this.registerInfo.Mobile) {
        this.registerInfoErr.Mobile = '请输入电话号码'
      } else if (!(/^1[34578]\d{9}$/.test(this.registerInfo.Mobile))) {
        this.registerInfoErr.Mobile = '请输入合法的电话号码'
      } else {
        this.registerInfoErr.Mobile = ''
      }
    },
    validName () {
      this.registerInfo.Name = this.registerInfo.Name.trim()
      if (!this.registerInfo.Name) {
        this.registerInfoErr.Name = '请输入真实姓名'
      } else if (this.registerInfo.Name.length > 10) {
        this.registerInfoErr.Name = '姓名不得大于10位'
      } else {
        this.registerInfoErr.Name = ''
      }
    },
    validPassword () {
      this.registerInfo.PassWord = this.registerInfo.PassWord.trim()
      if (!this.registerInfo.PassWord) {
        this.registerInfoErr.PassWord = '请输入密码'
      } else if (this.registerInfo.PassWord.length < 6 || this.registerInfo.PassWord.length > 12) {
        this.registerInfoErr.PassWord = '密码为6-12位字符'
      } else {
        this.registerInfoErr.PassWord = ''
      }
    },
    register () {
      this.validMobile()
      this.validName()
      this.validPassword()
      this.registerInfo.OpenId = wx.getStorageSync('OpenId')
      let valid = !!(!this.registerInfoErr.PassWord && !this.registerInfoErr.Name && !this.registerInfoErr.Mobile)
      if (valid) {
        this.registerInfo.PassWord = md5(this.registerInfo.PassWord)
        if (this.agreement) {
          registeUser({ValidateCode: this.ValidateCode, User: this.registerInfo}).then(res => {
            wx.showToast({
              title: res.ShowData, // 提示的内容,
              icon: 'none', // 图标,
              duration: 2000, // 延迟时间,
              mask: true, // 显示透明蒙层，防止触摸穿透,
              success: res => {}
            })
            if (res.Code === 200) {
              wx.setStorageSync('User', res.Data.User)
              wx.setStorageSync('token', res.Data.Token)
              wx.switchTab({ url: '../../pages/index/main' })
            }
          })
        } else {
          wx.showToast({
            title: '注册前请先确认注册协议', // 提示的内容,
            icon: 'none', // 图标,
            duration: 2000, // 延迟时间,
            mask: true, // 显示透明蒙层，防止触摸穿透,
            success: res => {}
          })
        }
      }
    }

  },
  onLoad () {
    if (wx.getStorageSync('User')) {
      wx.switchTab({ url: '../../pages/index/main' })
    }
  }
}
</script>

<style scope>
li{
  margin: 20rpx 60rpx;
}
input{
  border-bottom: 2rpx solid #eee;
  font-size: 28rpx;
  height: 80rpx;
  line-height: 80rpx;

}
button{
  margin-top: 120rpx;
  font-size: 30rpx;
  color:#fff;
  background: #3D3D3D;
}
.code{
position: relative;
height: 50rpx;

}
.code input{
  position: absolute;
 left: 0;
  width: 100%;

}
.code span{
  position: absolute;
  right: 50rpx;
  font-size: 28rpx;
  line-height: 80rpx;
  color:#ff2d50
}
navigator {
  display: inline;
}
</style>
