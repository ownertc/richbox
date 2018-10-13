
<template>
<div>
  <ul class="tabbar">
    <li class="item" style="font-size:16px">常用旅客</li>
    <li class="item" ><Button type="warning" @click="addUser">增加旅客</Button></li>
  </ul>
   <table width="100%" style="margin-top:30px; border-collapse: collapse;">
        <tr class="tabheadr">
            <td>姓名</td>
            <td>性别</td>
            <td>手机号码</td>
             <td>证件类型</td>
              <td>证件号码</td>
            <td>操作</td>
        </tr>
        <tr v-for=" (travel,index) in travelUserList" :key="index">
            <td>
              {{travel.Name}}
            </td>
            <td>{{travel.Sex}}</td>
            <td>{{travel.Mobile}}</td>
            <td>{{travel.CertificatesType}}</td>
            <td><span v-if="travel.IdCard">{{travel.IdCard}}</span><span  v-if="travel.Passport">{{travel.Passport}}</span></td>
            <td class="option"><span @click="editUser(travel)"  style="cursor:pointer">编辑</span><span style="cursor:pointer" @click="userDelete(travel.Id)">删除</span></td>
        </tr>
     </table>
     <Page :total="total" style="margin:20px;" @on-change="getList($event)" v-if="total" class="traver"></Page>
     <Modal v-model="modal" draggable scrollable title="增加常用旅客" class="addusal">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="margin-top:40px">
        <FormItem label="姓名:" prop="Name">
            <Input v-model="formValidate.Name" placeholder="请输入旅客姓名"/>
        </FormItem>
           <FormItem label="性别" prop="Sex">
            <RadioGroup v-model="formValidate.Sex">
                <Radio label="男">男</Radio>
                <Radio label="女">女</Radio>
            </RadioGroup>
        </FormItem>
         <FormItem label="手机号码:" prop="Mobile">
          <Input v-model="formValidate.Mobile" placeholder="请输入手机号码"/>
        </FormItem>
          <FormItem label="证件类型" prop="CertificatesType">
            <RadioGroup v-model="formValidate.CertificatesType">
                <Radio label="身份证">身份证</Radio>
                <Radio label="护照">护照</Radio>
            </RadioGroup>
        </FormItem>
         <FormItem label="身份证号:" prop="IdCard" v-if="formValidate.CertificatesType=='身份证'">
           <Input v-model="formValidate.IdCard" placeholder="请输入证件号码"/>
        </FormItem>
         <FormItem label="护照:" prop="Passport" v-if="formValidate.CertificatesType=='护照'">
           <Input v-model="formValidate.Passport" placeholder="请输入证件号码"/>
        </FormItem>
         <FormItem label="有效期至" class="date-select">
            <Row>
                <i-col span="6">
                    <FormItem prop="date">
                      <Select v-model="formValidate.year" placeholder="请选择" @on-change="isLeapYear()">
                      <Option :value="item" v-for="(item,index) in yearArr" :key="index">{{item}}</Option>
                      </Select>
                    </FormItem>
                </i-col >
                <i-col  span="6">
                    <FormItem prop="time">
                        <Select v-model="formValidate.moth" placeholder="请选择"  @on-change="getDays()">
                          <Option :value="item" v-for="(item,index) in mothArr" :key="index">{{item}}</Option>
                      </Select>
                    </FormItem>
                </i-col >
                 <i-col  span="6">
                    <FormItem prop="time">
                       <Select v-model="formValidate.date" placeholder="请选择">
                          <Option :value="item" v-for="(item,index) in dateDate" :key="index">{{item}}</Option>
                      </Select>
                    </FormItem>
                </i-col >
            </Row>
        </FormItem>
         <FormItem>
            <Button type="warning" @click="handleSubmit('formValidate')" class="mine" v-if="!disabledSave"> 保存</Button>
            <Button type="warning" class="mine" v-if="disabledSave" loading> loading</Button>
             <Button style="margin-left: 8px"  @click="handleReset('formValidate')" >取消</Button>
        </FormItem>
    </Form>
    </Modal>
</div>

</template>

<script>

// apis
import {userTravelListPage, userTravelAdd, userTravelDelete, userTravelEdit} from '@/api/travelUserInfo'

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
    let validateIdCard = function (rule, value, callback) {
      let re = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!re.test(value)) {
        let mssage = '请输入合法的身份证号码'
        callback(mssage)
      } else {
        callback()
      }
    }

    return {
      modal: false,
      disabledSave: false,
      travelUserList: [],
      travelUserQuery: {
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      yearArr: [],
      mothArr: ['1', '2', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      dateArr: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      dateDate: [],
      type: 1,
      formValidate: {
        Name: '',
        Mobile: '',
        moth: '',
        date: '',
        Sex: '男',
        Passport: '',
        IdCard: '',
        CertificatesType: '身份证'

      },
      ruleValidate: {
        Name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        Mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        IdCard: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' },
          { validator: validateIdCard, trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    addUser () {
      this.type = 1
      this.modal = true
      this.formValidate.moth = ''
      this.formValidate.year = ''
      this.$refs['formValidate'].resetFields()
    },
    getTravelUserList () {
      userTravelListPage(this.travelUserQuery).then(res => {
        if (res.data.Code === 200) {
          this.total = res.data.Data.Count
          this.travelUserList = res.data.Data.List
        }
      })
    },
    getList (e) {
      this.travelUserQuery.pageIndex = e
      this.getTravelUserList()
    },
    getYearArr () {
      let nowYear = new Date().getFullYear()
      for (let i = (nowYear * 1); i <= (nowYear * 1 + 100); i++) {
        this.yearArr.push(i.toString())
      }
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
    },
    handleSubmit (name, type) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.disabledSave = true
          this.formValidate.Validity = `${this.formValidate.year}-${this.formValidate.moth}-${this.formValidate.date}`
          if (this.type === 1) {
            userTravelAdd(this.formValidate).then(res => {
              if (res.data.Code === 200) {
                this.$Message.success('保存成功!')
                this.modal = false
                this.$refs[name].resetFields()
                this.getTravelUserList()
              }
              this.disabledSave = false
            })
          } else if (this.type === 2) {
            userTravelEdit(this.formValidate).then(res => {
              if (res.data.Code === 200) {
                this.$Message.success('修改成功!')
                this.modal = false
                this.$refs[name].resetFields()
                this.getTravelUserList()
              }
              this.disabledSave = false
            })
          }
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
      this.getTravelUserList()
      this.modal = false
    },
    userDelete (id) {
      this.$Modal.confirm({
        title: '温馨提示',
        content: '确认要删除吗？',
        onOk: () => {
          userTravelDelete(id).then(res => {
            if (res.data.Code === 200) {
              this.$Message.success('删除成功!')
              this.getTravelUserList()
            }
          })
        }
      })
    },
    editUser (user) {
      this.modal = true
      this.type = 2
      this.formValidate = user
      this.formValidate.year = new Date(user.Validity).getFullYear().toString()
      this.formValidate.moth = (new Date(user.Validity).getMonth() + 1).toString()
      this.getDays()
      this.formValidate.date = new Date(user.Validity).getDate().toString()
    }
  },
  mounted () {
    this.getTravelUserList()
    this.getYearArr()
  }
}
</script>
<style >
.date-select .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
font-size: 12px;
}
.date-select .ivu-select-single .ivu-select-selection .ivu-select-placeholder{
font-size: 12px;
color:#999;
}
   .addusal .ivu-btn-primary{
       background-color: #f94;
       border-color:#f94;
   }
 .addusal  .ivu-modal-footer{
border-top:none;
text-align: center;
display:none;

   }
 .addusal   .ivu-btn-text{
background: #eee;
   }
   .addusal .ivu-radio-inner:after{
  background-color: #f94;
}
.addusal .ivu-radio-checked .ivu-radio-inner {
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

.item{
font-size: 13px;
color:#333;
}
tr{
border-bottom: 1px solid #ccc;
}
.tabheadr{
height: 40px;
background: #ccc;
border: none;
}
tr td{
    text-align: center;
    padding: 10px;
}
tr td{
font-size: 12px;
color:#666;
line-height: 2;
}

.option span{
margin-right: 10px;
}
</style>
