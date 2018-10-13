<template>
  <div class="regsiter" :style="{backgroundImage:'url(' +bg + ')'}">
     <navbar class="navbar"></navbar>
   <div class="regsiter-main">
     <div class="left">
        <div class="logo"><img :src="logo" alt=""></div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" class="regsiterform">
        <FormItem prop="Name" label="">
            <Input v-model="formValidate.Name" placeholder="请输入用户名"/>
        </FormItem>
        <FormItem prop="Mobile" label="">
            <Input v-model="formValidate.Mobile" placeholder="请输入手机号码作为登录名" @on-blur="getCodeImg()" />
        </FormItem>
        <FormItem prop="CodeImg" label="" style="position:relative"  class="code">
            <Input v-model="formValidate.CodeImg" placeholder="请输入图形验证码" style="position:absolute;left:0;top:0" @on-blur="validCodeImg()"/>
            <img :src="imgCodeUrl" style="position:absolute;right:80px;top:0;color:#f90;font-size:14px;width:80px;height:30px" @click="selectCode()"/>
        </FormItem>
         <FormItem prop="code" label="" style="position:relative;top:30px" class="code">
            <Input v-model="formValidate.code" placeholder="请输入短信验证码" style="position:absolute;left:0;top:0" />
            <span style="position:absolute;right:120px;top:0;color:#f90;font-size:14px;cursor:pointer" @click="getCode()" v-if="buttonSend">获取验证码</span>
            <span style="position:absolute;right:120px;top:0;color:#f90;font-size:14px" v-if="!buttonSend">{{timeTotal}}s后重新获取</span>
        </FormItem>
         <FormItem prop="PassWord" label="" style="margin-top:80px">
            <Input v-model="formValidate.PassWord" placeholder="输入密码（6-16位字符，区分大小写）" type="password"/>
        </FormItem>

         <FormItem style="font-size:14px;margin-top:20px">
             <input type="checkbox"  style="width:25px;height:20px;margin-right:5px" v-model="agree">我已阅读并同意
             <span style="color:#f90;font-size:14px;cursor:pointer" @click="modal13=true">《德途酒店协议》</span>
         </FormItem>
        <FormItem >
            <Button type="warning" @click="handleSubmit('formValidate')">注册</Button>
        </FormItem>
    </Form>
     </div>
      <div class="right" :style="{backgroundImage:'url(' +bg1 + ')'}">
          <div class="top"><span>已是会员</span><Button type="warning"><router-link to="/login" style="color:#fff">直接登录</router-link></Button></div>

          <div class="bottom">
                <p class="title1">会员权益</p>
                <p class="item">1.享受房费折扣，最高可享受门市价的85折;</p>
               <p class="item">2.通过上海德途酒店的官网或微信注册的新会员， 即送20元订房券。</p>
          </div>
      </div>
   </div>
<!--    注册协议开始 -->
<Modal v-model="modal13" draggable scrollable title="德途酒店协议">
<div class="agreement" style="height:400px;overflow-y:scroll;width:100%">
          <p class="content">在以下条款中，“用户”是指向注册成为本公司会员的个人或者单位。
    用户同意此在线注册条款之效力如同用户亲自签字、盖章的书面条款一样，对用户具有法律约束力。
    用户进入本公司会员注册程序即意味着用户同意了本注册条款的所有内容且只有用户完全同意所有服务条款并完成注册程序，才能成为本公司的正式用户。本注册条款自用户注册成功之日起在用户与本公司之间产生法律效力。
    </p>
    <p class="title">第一条：&nbsp;&nbsp;用户身份保证</p>
    <p class="content">1-1用户承诺并保证自己是具有完全民事行为能力和完全民事权利能力的自然人、法人、实体和组织。用户在此保证所有填写的用户信息是真实、准确、完整、及时的，并且没有任何引人误解或者虚假的陈述，且保证本公司可以通过用户填写的联系方式与用户取得联系。</p>
    <p  class="content">1-2用户应根据本公司对于相关服务的要求及时提供相应身份证明等资料，否则本公司有权拒绝向该会员或用户提供相关服务 </p>
    <p class="content">1-3用户承诺将及时更新其用户信息以维持该等信息的有效性。</p>
    <p class="content">1-4如果用户提供的资料或信息包含有不正确、不真实的信息，本公司保留取消用户会员资格并随时结束为该用户提供服务的权利</p>
    <p  class="content">1-5以代理人身份代理其他自然人或者单位进行注册用户必须向本公司提供代理人和被代理人的详细资料和信息及授权书面文件，未向本公司提供上述材料信息及文件的，本公司将视为注册者会员。</p>
    <p class="title">第二条:&nbsp;&nbsp;邮件通知</p>
    <p  class="content"> 用户充分理解本公司将通过电子邮件的方式与注册会员保持联络及沟通，用户在此同意本公司通过电子邮件方式向其发送包括会员信息、本公司商品及服务信息在内的相关商业及非商业联络信息。</p>
    <p  class="content">3-1用户注册成功后将得到一个用户名和密码，用户凭用户名和密码享受本公司向会员用户提供的商品和服务。</p>
    <p  class="content">3-2用户将对用户名和密码安全负全部责任，并且用户对其用户名进行的所有活动和事件负全责。用户有权根据本公司规定的程序修改密码。</p>
    <p class="content">3-3非经本公司书面同意，用户名和密码不得擅自转让或者授权他人使用，否则用户应承担由此造成的一切后果。</p>
    <p class="content">3-4用户若发现任何非法使用用户账号或存在安全漏洞的情况，请立即通告本公司。</p>
    <p  class="title">第四条&nbsp;&nbsp;服务条款的修改和服务体系修订 </p>
    <p class="content">本公司有权在必要时修改服务条款，本公司服务条款一旦发生变动，将会在重要页面上提示修改内容。如果不同意所改动的内容，用户可以主动取消获得的网络服务。如果用户继续享用本公司网络服务，则视为接受服务条款的变动。本公司保留随时修改其服务体系和价格而不需通知用户的权利，本公司修改其服务和价格体系之前用户就具体服务与本公司达成协议并已按照约定缴纳费用的，本公司将按照已达成的协议执行至已交纳费用的服务期期满。</p>
    <p class="title">第五条:&nbsp;&nbsp;本公司的权利和义务</p>
    <p  class="content">5-1本公司应根据用户选择的服务以及交纳款项的情况向用户提供合格的网络技术和信息服务。</p>
    <p class="content">5-2本公司承诺对用户资料采取对外保密措施，不向第三方披露用户资料，不授权第三方使用用户资料；</p>
    <p class="content">5-2-1依据本协议条款或用户与本公司之间其他服务协议、合同、在线条款等规定可以提供；
    </p>
    <p class="content"> 5-2-2依据法律法规的规定应当提供； </p>
    <p  class="content">5-2-3行政、司法等有权部门要求本公司提供；</p>
    <p class="content"> 5-2-4用户同意本公司向第三方提供</p>
    <p  class="content"> 5-2-5本公司解决举报事件、提起诉讼而提交的；</p>
    <p class="content"> 5-2-6本公司为防止严重违法行为或涉嫌犯罪行为发生而采取必要合理行动所必须提交的； </p>
    <p  class="content">5-2-7本公司为向用户提供产品、服务、信息而向第三方提供的，包括本公司通过第三方的技术及服务向用户提供产品、服务、信息的情况。 </p>
    <p  class="content">5-3本公司有权使用用户资料。 </p>
    <p  class="content">5-4本公司有权利对用户进行审查并决定是否接受用户成为本公司或是否与用户进行某一交易。</p>
    <p  class="content">5-5本公司保留在用户违反国家、地方法律法规或违反本在线注册条款的情况下终止为用户账号的权利，并且在任何情况下，本公司对任何间接、偶然、特殊及继起的损害不负责任。 </p>
    <p class="title"> 第六条: &nbsp;&nbsp;服务的终止</p>
    <p class="content"> 6-1 用户有权随时申请终止其会员资格或其在本公司申请的一项或多项服务，但已交纳款项不得要求退还。 </p>
    <p class="content">6-2本公司有权根据实际情况决定取消为用户提供的一项或多项服务，但应退还用户为该服务所交纳款项的剩余部分，除此之外本公司不承担任何责任。 </p>
      <p class="title">第七条:&nbsp;&nbsp;争议解决及法律适用 </p>
    <p class="content">7-1因本服务条款有关的一切争议，双方当事人应通过友好协商方式解决。如果协商未成，双方同意向本公司主要经营地的人民法院起诉。</p>
    <p class="content">7-2本注册条款的效力、解释、履行和争议的解决均适用中华人民共和国法律法规和计算机、互联网行业的规范。</p>
    <p class="title">第八条&nbsp;&nbsp;不可抗力</p>
    <p  class="content" >8-1因不可抗力或者其他意外事件，使得本条款履行不可能、不必要或者无意义的，遭受不可抗力意外事件的一方不承担责任。</p>
    <p class="content" >8-2不可抗力、意外事件是指不能预见、不能克服并不能避免且对一方或双方当事人造成重大影响的客观事件，包括但不限于自然灾害如洪水、地震、瘟疫流行和风暴等以及社会事件如战争、动乱、政府行为等。</p>
    <p class="content">8-3用户同意鉴于互联网的特殊性，黑客攻击、互联网连通中断或者系统故障等属于不可抗力，由此用户或第三方造成的损失不应由本公司承担。</p>
    <p  class="title">第九条&nbsp;&nbsp; 附则</p>
    <p class="content">9-1本注册条款中有关条款若被权威机构认定为无效，不应影响其他条款的效力，也不影响本服务条款的解释、违约责任及争议解决的有关约定的效力。</p>
    <p class="content">9-2 一方变更通知、通讯地址或其他联系方式，应自变更之日起及时将变更后的地址、联系方式通知另一方，否则变更方应对此造成的一切后果承担责任。用户同意，本公司的有关通知只需要在本公司有关网页上发布即视为送达用户。</p>
    <p class="content">9-3因本公司上市、被收购、与第三方合并、名称变更等事由，用户同意本公司可以将其权利或义务转让给相应的本公司权利义务的承受者。</p>
    <p class="content" style="color:#000">
    用户在此再次保证已经完全阅读并理解了上述会员注册条款并自愿正式进入中国本公司会员在线注册程序，接受上述所有条款的约束。
    </p>
  </div>
</Modal>
  <!--    注册协议结束 -->
  </div>
</template>

<script>
import navbar from '@/components/navbar'
// images
import bg from '@/assets/images/regbg.png'
import bg1 from '@/assets/images/regbg1.png'
import logo from '@/assets/images/reglogo.png'

// api
import {register, getValidCode} from '@/api/user'
import {getCode, validCode} from '@/api/validCode'

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

    return {
      bg,
      bg1,
      logo,
      buttonSend: true,
      modal13: false,
      timeTotal: 60,
      agree: false,
      imgCodeUrl: '',
      imgValid: false,
      mobile: '18161183024',
      formValidate: {
        Name: '',
        Mobile: '',
        code: '',
        PassWord: '',
        CodeImg: ''
      },
      ruleValidate: {
        Name: [
          { required: true, message: '用户名不得为空', trigger: 'blur' },
          {min: 2, message: '用户名最少2位'},
          {max: 10, message: '用户名最多10位'}
        ],
        Mobile: [
          { required: true, message: '手机号码不得为空', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '短信验证码不得为空', trigger: 'change' }
        ],
        CodeImg: [
          { required: true, message: '图形验证码不得为空', trigger: 'change' }
        ],
        PassWord: [
          { required: true, message: '密码不得为空', trigger: 'blur' },
          {min: 6, message: '密码最少6位'}
        ]

      }
    }
  },
  components: {
    navbar
  },
  methods: {
    /**
     *获取图形验证码
     */
    getCodeImg () {
      let mobile = this.formValidate.Mobile ? this.formValidate.Mobile : this.mobile
      getCode({mobile: mobile}).then(res => {
        return 'data:image/png;base64,' + btoa(
          new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
      })
        .then(data => {
          this.imgCodeUrl = data
        })
        .catch(ex => {
          console.error(ex)
        })
    },
    selectCode () {
      this.getCodeImg()
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.agree) {
            this.formValidate.PassWord = md5(this.formValidate.PassWord)
            register(this.formValidate, `/GwUser/Add?code=${this.formValidate.code}`).then(res => {
              if (res.data.Code !== 200) {
                this.$Modal.info({
                  title: '提示',
                  content: res.data.ShowData
                })
              } else {
                localStorage.setItem('user', JSON.stringify(res.data.Data))
                this.$router.push({path: '/login'})
              }
            })
          } else {
            this.$Modal.warning({
              title: '温馨提示',
              content: '注册前请先确定阅读《德途酒店协议》'
            })
          }
        }
      })
    },
    getCode () {
      if (!this.formValidate.Mobile) {
        this.$Modal.warning({
          title: '提示',
          content: '获取验证码之前必须先输入电话号码！'
        })
      } else {
        if (this.imgValid) {
          getValidCode({Value: this.formValidate.Mobile}).then(res => {
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
            }
          })
        } else {
          this.$Modal.warning({
            title: '提示',
            content: '获取短信验证码之前必须先通过图形验证码！'
          })
          this.getCodeImg()
          this.formValidate.CodeImg = ''
        }
      }
    },
    validCodeImg () {
      validCode({'Mobile': this.formValidate.Mobile, 'Code': this.formValidate.CodeImg}).then(res => {
        if (res.data.Code === 200) {
          this.imgValid = true
        } else {
          this.imgValid = false
        }
      })
    }
  },
  mounted () {
    this.getCodeImg()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.ivu-btn-warning{
    font-size: 14px;
}
form{
    margin-top: 30px;
}
.regsiterform .ivu-input {
    display: inline-block;
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
.regsiterform .ivu-input:hover{
border-color: rgb(255, 255, 0);
 box-shadow:none;
}
.regsiterform .ivu-form-item-error .ivu-input {
    border: none;
    border-bottom: 1px solid rgba(255,0,0,.5);
    box-shadow:none;
}
.regsiterform .ivu-btn-warning{
    padding-left:20px;
    padding-right: 20px;
}
.code .ivu-form-item-error-tip{
margin-top: 40px;
}
</style>

<style scoped>
.agreement{
width: 80%;

}
.content {
  font-size: 14px;
  color: #666;
 line-height: 3;
  margin-left: 20px;
}
.title {
line-height: 80px;
  color: #000;
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
}
.right{
   padding:20px;
   color:#fff;
   font-size:15px;
   line-height:2;
}
.right .top span{
    margin-right:10px;

}
.right .bottom .title1{
margin-top:20px;
}
.right .bottom p+p{
margin:10px 0;
}
.regsiter {
  width: 100vw;
  min-height: 100vh;
  position: relative;
  background-size: cover;
  background-position: center center;
}
.regsiter-main{
width: 800PX;
height: 452PX;
position:absolute;
left:50%;
top:50%;
margin-left: -400px;
margin-top: -211px;
display: flex;
}
.left{
    width:580px;
    height: 452px;
    background: #fff;
}
.right{
    width:220px;
    height: 452px;
    background-size: cover;
}
.logo,.logo img{
    width:80px;
    height: 30px;
    margin-left: 20px;
    margin-top: 20px;
}

</style>
