
<template>
<div>
  <ul class="tabbar">
    <li class="userinfo">
       <img :src="one1" class="avter" alt="">
       <div class="right">
           <p class="name">{{user.Name}}</p>
           <p class="score"><span>{{user.VipLevelName}}</span><span>积分{{user.Score}}</span></p>
       </div>
    </li>
  </ul>
 <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="margin-top:40px" class="addform">
        <FormItem label="真实姓名:" prop="Name">
            <Input v-model="formValidate.Name" placeholder="请输入姓名"/>
        </FormItem>
         <FormItem label="电子邮箱:" prop="Email">
         <span v-if="!editEmail">{{user.Email}}</span><span style="font-size:12px;color:#999;margin-left:30px;cursor:pointer" @click="editEmail=true" v-if="!editEmail">修改</span>
      <Input v-model="formValidate.Email" placeholder="请输入邮箱" v-if="editEmail"/>
        </FormItem>
        <FormItem label="手机号码:" prop="mail">
          <span>{{user.Mobile}}</span>
        </FormItem>
        <FormItem label="性别" prop="gender">
            <RadioGroup v-model="formValidate.Sex">
                <Radio label="1">男</Radio>
                <Radio label="2">女</Radio>
            </RadioGroup>
        </FormItem>
         <FormItem label="出生日期" class="date-select">
            <Row>
                <i-col span="4">
                    <FormItem prop="date">
                    <Select v-model="formValidate.year" placeholder="请选择" @on-change="isLeapYear()">
                      <Option :value="item" v-for="(item,index) in yearArr" :key="index">{{item}}</Option>
                      </Select>
                    </FormItem>
                </i-col>
                <i-col span="4">
                    <FormItem prop="time">
                        <Select v-model="formValidate.moth" placeholder="请选择"  @on-change="getDays()">
                          <Option :value="item" v-for="(item,index) in mothArr" :key="index">{{item}}</Option>
                      </Select>
                    </FormItem>
                </i-col>
                 <i-col span="4">
                    <FormItem prop="time">
                         <Select v-model="formValidate.date" placeholder="请选择">
                          <Option :value="item" v-for="(item,index) in dateDate" :key="index">{{item}}</Option>
                      </Select>
                    </FormItem>
                </i-col>
            </Row>
        </FormItem>
        <FormItem>
            <Button type="warning" @click="handleSubmit('formValidate')" class="mine">保存</Button>
        </FormItem>
    </Form>
</div>

</template>

<script>

// images
import one1 from '@/assets/images/one1-1.png'

// apis
import { getUserInfo, userEdit } from '@/api/user'
export default {
  data () {
    return {
      one1,
      currIndex: 0,
      user: {},
      editEmail: false,
      yearArr: [],
      mothArr: ['1', '2', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      dateArr: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      dateDate: [],
      formValidate: {
        Name: '',
        Email: '',
        Mobile: '',
        year: '',
        moth: '',
        date: '',
        Sex: '1',
        interest: [],
        time: '',
        desc: ''
      },
      ruleValidate: {
        Name: [
          { required: true, message: '姓名不得为空！', trigger: 'blur' }
        ],
        Email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.formValidate.Birthbay = new Date(`${this.formValidate.year}-${this.formValidate.moth}-${this.formValidate.date}`)
          userEdit(this.formValidate).then(res => {
            if (res.data.Code === 200) {
              this.$Message.success('修改成功!')
            } else {
              this.$Message.error('修改失败！')
            }
          })
        }
      })
    },
    getYearArr () {
      let nowYear = new Date().getFullYear()
      for (let i = (nowYear * 1 - 100); i <= nowYear; i++) {
        this.yearArr.push(i.toString())
      }
    },
    getUser () {
      getUserInfo().then(res => {
        if (res.data.Code === 200) {
          this.formValidate = res.data.Data
          this.formValidate.year = res.data.Data.Birthbay ? new Date(res.data.Data.Birthbay).getFullYear().toString() : ''
          this.formValidate.moth = res.data.Data.Birthbay ? (new Date(res.data.Data.Birthbay).getMonth() + 1).toString() : ''
          this.getDays()
          this.formValidate.date = res.data.Data.Birthbay ? (new Date(res.data.Data.Birthbay).getDate()).toString() : ''
          this.formValidate.Sex = res.data.Data.Sex ? res.data.Data.Sex : '1'
          this.user = res.data.Data
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    isLeapYear () {
      let year = this.formValidate.year
      if ((year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0)) {
        this.dateArr[1] = 29
      } else {
        this.dateArr[1] = 28
      }
    },
    getDays () {
      this.dateDate = []
      let days = this.dateArr[this.formValidate.moth - 1]
      for (let i = 1; i <= days * 1; i++) {
        this.dateDate.push(i.toString())
      }
    }
  },
  mounted () {
    this.getUser()
    this.getYearArr()
  }
}
</script>
<style>
.date-select .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
font-size: 12px;
}
.date-select .ivu-select-single .ivu-select-selection .ivu-select-placeholder{
font-size: 12px;
color:#999;
}
.mine.ivu-btn-warning{
width:120px;
}
.addform .ivu-radio-inner:after{
  background-color: #f94;
}
.addform .ivu-radio-checked .ivu-radio-inner {
border-color:#f94;
}
</style>

<style scoped>
.ivu-layout-content{
    position: relative;
    top:0;
    bottom: 0;
    min-height: 100vh;
    width: 100vw;
}
.headerbar{
    width: 100%;
    height: 50px;
    position: relative;
}

li.active{
color:#f94
}
.tabbar{
display: flex;
align-items: center;
margin-top: 30px;
justify-content: space-between;
border-bottom:1px solid #ccc;
padding: 0 20px 20px 20px;
}
.userinfo{
width:200px;
display: flex;
justify-content: space-between;
margin-right: 50px;
}
.avter{
width:50px;
height: 50px;
border-radius: 50%;
background: #f94;
}
.name{
    font-size: 14px;
    font-weight: 600;
    color:#333;
}
.score{
    font-size:12px;
    color:#666;
     margin-top: 10px;
}
.score span{
    margin-right: 20px;

}

.tabheadr{
height: 40px;
background: #ccc;
border: none;
}

</style>
