
<template>
 <Layout>
    <Header  class="headerbar">
       <headrbar></headrbar>
    </Header>
   <Content>
  <div class="regsiter" >
   <div class="regsiter-main">
        <div v-if="step==1">
            <P class="title">找回密码</P>
            <Form ref="formValidate" :model="formValidate"  :label-width="80" class="forget" :rules="ruleValidate">
                <FormItem prop="Mobile" label="">
                    <Input v-model="formValidate.Mobile" placeholder="请输入手机号"/>
                </FormItem>
                <FormItem prop="code" label="" style="position:relative" class="code">
                    <Input v-model="formValidate.code" placeholder="请输入验证码" style="position:absolute;left:0;top:0;width:220px"/>
                    <Button style="position:absolute;left:300px;width:100px;height:40px;" type="warning" v-if="buttonSend" @click="getCode()">获取验证码</Button>
                    <Button style="position:absolute;left:300px;width:120px;height:40px;" type="warning" v-if="!buttonSend">{{timeTotal}}S后重新获取</Button>
                </FormItem>
                 <FormItem  style="margin-top:80px">
                    <Button style="width:400px;height:40px;" type="warning" @click="handleSubmit('formValidate')">下一步</Button>
                </FormItem>
            </Form>
            </div>
            <div v-if="step==2">
             <P class="title">重置密码</P>
             <Form ref="formValidate2"  :label-width="80" >
                <FormItem prop="PassWord" label="">
                    <Input v-model="formValidate2.PassWord" placeholder="请填写新密码" type="password"/>
                </FormItem>
               <FormItem prop="notPassWord" label="">
                    <Input v-model="formValidate2.notPassWord" placeholder="请再次输入新密码" type="password"/>
                </FormItem>
                 <FormItem>
                    <Button style="width:400px;height:40px;" type="warning" @click="handleSubmit('formValidate2')">确定</Button>
                </FormItem>
            </Form>
            </div>
   </div>
   <Modal :visible.sync="modal">
        <p>{{message}}</p>
    </Modal>
  </div>
  </Content>
        <Footer><footerbar></footerbar></Footer>
    </Layout>
</template>

<script>
// api
import {findPassword, findPasswordCode} from '@/api/user'
// components
import headrbar from '@/components/headrbar'
import footerbar from '@/components/footerbar'
// images
import bg from '@/assets/images/regbg.png'
import md5 from 'md5'
export default {
  data () {
    let validateMobile = function (rule, value, callback) {
      let re = /^1\d{10}$/
      if (!re.test(value)) {
        let mssage = '请输入正确的手机号码'
        callback(mssage)
      } else {
        callback()
      }
    }
    let confirmPassword = function (rule, value, callback) {
      if (value !== this.formValidate2.PassWord) {
        let mssage = '两次输入密码不一致'
        callback(mssage)
      } else {
        callback()
      }
    }
    return {
      bg,
      step: 1,
      modal: false,
      message: '',
      timeTotal: 60,
      buttonSend: true,
      formValidate: {
        Mobile: '',
        code: ''
      },
      formValidate2: {
        PassWord: '',
        notPassWord: ''
      },
      ruleValidate: {
        Mobile: [
          { required: true, message: '手机号码不得为空', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不得为空', trigger: 'blur' }
        ]
      },
      ruleValidate1: {
        PassWord: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {min: 6, message: '密码最少6位'}
        ],
        notPassWord: [
          { required: true, message: '请再一次输入新密码', trigger: 'blur' },
          { validator: confirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    headrbar,
    footerbar
  },
  methods: {
    getCode () {
      if (!this.formValidate.Mobile) {
        this.$Modal.warning({
          title: '提示',
          content: '获取验证码之前必须先输入电话号码！'
        })
      } else {
        findPasswordCode({Value: this.formValidate.Mobile}).then(res => {
          if (res.data.Code === 200) {
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

          }
        })
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (name === 'formValidate') {
            this.step = 2
          }
          if (name === 'formValidate2') {
            let pass = {}
            pass.PassWord = md5(this.formValidate2.PassWord)
            pass.Code = this.formValidate.code
            pass.Mobile = this.formValidate.Mobile
            findPassword(pass).then(res => {
              if (res.data.Code === 200) {
                this.$Modal.confirm({
                  title: ' ',
                  content: '<p>密码修改成功！</p>',
                  loading: true,
                  onOk: () => {
                    setTimeout(() => {
                      this.$Modal.remove()
                      this.$router.push({path: '/login'})
                    }, 2000)
                  }
                })
              } else {
                this.$Message.warning({content: res.data.ShowData})
              }
            })
          }
        } else {
          this.$Message.error('Fail!')
        }
      })
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.forget .ivu-input {
    width: 400PX;
    height: 40px;

}
.code .ivu-form-item-error-tip{
margin-top:40px;
}
</style>

<style scoped>
.content{
width: 1200px;
min-height: 100vh;
margin: 0 auto;
padding-top:50px;
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
    position: relative;
}
.ivu-layout-content{
background: #fff;
}
.regsiter {
  width: 100vw;
  min-height: 100vh;
  background: #fff;

}
.regsiter-main{
  width: 1000PX;
  min-height: 100%;
  margin: 0 auto;

}
.title{
margin:30px 0;
font-size:20px;
color:#444;
letter-spacing:2px;
border-bottom:1px solid #ccc;
padding: 20PX 0;
}

</style>
