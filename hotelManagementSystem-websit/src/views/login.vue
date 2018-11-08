
<template>
  <div class="regsiter" :style="{backgroundImage:'url(' +bg + ')'}">
     <navbar class="navbar"></navbar>
   <div class="regsiter-main">
       <P class="title">会员登录</P>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" class="loginform">
        <FormItem prop="Mobile" label="">
            <Input v-model="formValidate.Mobile" placeholder="请输入手机号"  @on-blur="codeIsShow()" />
        </FormItem>
         <FormItem prop="PassWord" label="" >
            <Input v-model="formValidate.PassWord" placeholder="输入密码" @on-change="getPassword($event)"/>
        </FormItem>
         <FormItem prop="Code" label="" style="position:relative" v-if="codeShow" class="code">
            <Input v-model="formValidate.Code" placeholder="请输入验证码" style="position:absolute;left:0;top:0"/>
            <img :src="imgCodeUrl" style="position:absolute;right:80px;top:0;color:#f90;font-size:14px;width:80px;height:30px" @click="selectCode()"/>
        </FormItem>
        <FormItem style="margin-top:60px">
             <router-link to="/findPassword" style="font-size:14px;text-align:right;color:#999;margin-right:20%;display:block;width:100%;position:relative;right:30px;width:100px;margin-left:300px">忘记密码?</router-link>
          </FormItem>
        <div style="text-align:center;margin-left:0">
            <Button type="warning" @click="handleSubmit('formValidate')" class="loinbtn">登录</Button>
        </div>
    </Form>
   </div>
  </div>
</template>

<script>
import navbar from '@/components/navbar'
import Cookies from 'js-cookie'
import bg from '@/assets/images/regbg.png'
import md5 from 'md5'
import {login} from '@/api/user'
export default {
  data () {
    let validateMobile = function (rule, value, callback) {
      let re = /^1\d{10}$/
      if (!re.test(value)) {
        let mssage = '请输入正确的登录账号'
        callback(mssage)
      } else {
        callback()
      }
    }
    return {
      bg,
      imgCodeUrl: '',
      codeShow: false,
      pass: '',
      formValidate: {
        Mobile: '',
        PassWord: '',
        Code: ''
      },
      ruleValidate: {
        Mobile: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        PassWord: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          {min: 6, message: '密码最少6位'}
        ],
        Code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    navbar
  },
  methods: {
    codeIsShow () {
      let re = /^1\d{10}$/
      if (re.test(this.formValidate.Mobile)) {
        this.codeShow = true
        this.imgCodeUrl = `http://testapi.detuhotel.cn/api/GwLogin/PostSendImgCode?mobile=${this.formValidate.Mobile}&num=${Math.random()}`
      } else {
        this.codeShow = false
      }
    },
    // 切换验证码
    selectCode () {
      this.imgCodeUrl = `http://testapi.detuhotel.cn/api/GwLogin/PostSendImgCode?mobile=${this.formValidate.Mobile}&num=${Math.random()}`
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let params = {}
          params.PassWord = md5(this.pass)
          params.Mobile = this.formValidate.Mobile
          params.Code = this.formValidate.Code
          login(params).then(res => {
            if (res.data.Code === 200) {
              Cookies.set('usertoken', res.data.Data.Token, {
                expires: 1
              })
              this.$router.push({name: 'index'})
            } else if (res.data.ShowData === '密码输入错误') {
              this.$Message.warning({content: res.data.ShowData})
              this.formValidate.PassWord = ''
              this.formValidate.Code = ''
              this.pass = ''
              this.selectCode()
            } else {
              this.$Message.warning({content: res.data.ShowData})
            }
          })
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    getPassword (e) {
      let str = e.data ? e.data : event.srcElement.value[event.srcElement.value.length - 1]
      if (str) {
        this.pass += str
      } else {
        this.pass = this.pass.slice(0, this.pass.length - 1)
      }
      this.formValidate.PassWord = this.formValidate.PassWord.replace(/./g, '*')
    }
  },
  mounted () {
    if (Cookies.get('usertoken') && Cookies.get('user')) {
      this.$router.push({name: 'index'})
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.loinbtn.ivu-btn-warning{
font-size: 14px !important;
}
form{
    margin-top: 30px !important;
}
.loginform .ivu-input {
    display: inline-block !important;
    width: 80%;
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 14px;
    border: none;
    border-bottom: 1px solid #eee;
    border-radius: 0;
    color: #333;
    background-color: transparent;
    background-image: none;
    position: relative;
    cursor: text;
    outline:none ;
}
.loginform .ivu-input:hover{
border-color: rgb(255, 255, 0);
 box-shadow:none;
}
.loginform .ivu-form-item-error .ivu-input {
    border: none;
    border-bottom: 1px solid rgba(255,0,0,.5);
    box-shadow:none;
}
.loinbtn.ivu-btn-warning{
    padding-left:30px;
    padding-right: 30px;
}
.code .ivu-form-item-error-tip{
margin-top: 50px;
}
</style>

<style scoped>
.regsiter {
  width: 100vw;
  min-height: 100vh;
  position: relative;
  background-size: cover;
  background-position: center center;
}
.regsiter-main{
width: 500PX;
height: 362PX;
position:absolute;
left:50%;
top:50%;
margin-left: -250px;
margin-top: -181px;
background:#fff;
}
.title{
margin:30px 0;
font-size:16px;
text-align:center;
font-weight:550;
color:#333;
letter-spacing:2px;
}
</style>
