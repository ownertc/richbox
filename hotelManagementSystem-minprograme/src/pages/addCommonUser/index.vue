<template>
  <div>
   <ul class="adduser">
     <li :class="{'err':travalUserErr.Name}"><span>姓名</span><input type="text" name="" id="" placeholder="请输入姓名(与证件名一致)" v-model="travalUser.Name" @input="validName()"></li>
     <li  style="color:red;font-size:26rpx" v-if="travalUserErr.Name">{{travalUserErr.Name}}</li>
     <li :class="{'err':travalUserErr.Mobile}"><span>联系电话</span><input type="text" name="" id="" placeholder="请输入联系电话" v-model="travalUser.Mobile" @input="validMobile()"></li>
     <li  style="color:red;font-size:26rpx" v-if="travalUserErr.Mobile">{{travalUserErr.Mobile}}</li>
     <li><span>证件类型</span> 
     <picker  :range="CertificatesTypeArr"  @change="selectCertype($event)">
    <view class="picker" style="font-size:30rpx;">
       {{travalUser.CertificatesType}}
    </view></picker></li>
     <li :class="{'err':travalUserErr.IdCard}"><span>证件号码</span><input type="text" placeholder="请输入证件和号码"  v-model="travalUser.IdCard"></li>
     <li  style="color:red;font-size:26rpx" v-if="travalUserErr.IdCard">{{travalUserErr.IdCard}}</li>
       <li><span>证件有效期</span> 
     <picker   mode="date"  @change="selectDate($event)" start='2018-9-28'>
    <view class="picker" style="font-size:30rpx;"  >
       <span v-if="travalUser.Validity">{{travalUser.Validity}}</span>
       <span v-if="!travalUser.Validity">请选择</span>
    </view></picker></li>
 <li><span>性别</span> 
     <picker  :range="sexArr"  @change="selectSex($event)">
    <view class="picker" style="font-size:30rpx;">
       {{travalUser.Sex}}
    </view></picker></li>
   
   </ul>
    <button class="add" @click="btnEvent()">保存</button>
  </div>
</template>

<script>
import {addCommonInfo, editTravalUsers} from '@/utils/api'
import {formatTime} from '@/utils/index'
export default {
  data () {
    return {
      CertificatesTypeArr: ['身份证', '其他'],
      sexArr: ['男', '女'],
      type: 1, // 1为新增2为编辑
      travalUser: {
        UserId: '0',
        Name: '',
        IdCard: '',
        Mobile: '',
        start: formatTime(new Date()).replace(/-/g, '-'),
        Sex: '男',
        Validity: '',
        CertificatesType: ''
      },
      travalUserErr: {
        Name: '',
        IdCard: '',
        Mobile: '',
        CertificatesType: ''
      }
    }
  },
  methods: {
    initData () {
      this.type = 1 // 1为新增2为编辑
      this.travalUser.UserId = 0
      this.travalUser.Name = ''
      this.travalUser.IdCard = ''
      this.travalUser.Mobile = ''
      this.travalUser.CertificatesType = '身份证'
      this.travalUser.Sex = '男'
      this.travalUserErr.Name = ''
      this.travalUserErr.IdCard = ''
      this.travalUserErr.Mobile = ''
      this.travalUserErr.CertificatesType = ''
    },
    validName () {
      this.travalUser.Name = this.travalUser.Name.trim()
      if (!this.travalUser.Name) {
        this.travalUserErr.Name = '请输入用户名'
      } else if (this.travalUser.Name.length > 10 || this.travalUser.Name.length < 2) {
        this.travalUserErr.Name = '用户名2-10位'
      } else {
        this.travalUserErr.Name = ''
      }
    },
    validMobile () {
      this.travalUser.Mobile = this.travalUser.Mobile.trim()
      if (!this.travalUser.Mobile) {
        this.travalUserErr.Mobile = '请输入电话号码'
      } else if (!(/^1[34578]\d{9}$/.test(this.travalUser.Mobile))) {
        this.travalUserErr.Mobile = '请输入合法的电话号码'
      } else {
        this.travalUserErr.Mobile = ''
      }
    },
    /*  validIdCard () {
      this.travalUser.IdCard = this.travalUser.IdCard.trim()
      if (!this.travalUser.IdCard) {
        this.travalUserErr.IdCard = '请输入证件号码'
      } else {
        this.travalUserErr.IdCard = ''
      }
    }, */
    selectDate (e) {
      this.travalUser.Validity = e.target.value
    },
    selectCertype (e) {
      this.travalUser.CertificatesType = this.CertificatesTypeArr[e.target.value]
    },
    selectSex (e) {
      this.travalUser.Sex = this.sexArr[e.target.value]
    },
    editTravalUser () {
      editTravalUsers(this.travalUser).then(res => {
        if (res.Code === 200) {
          wx.showToast({
            title: '操作成功！', // 提示的内容,
            icon: 'success', // 图标,
            duration: 2000, // 延迟时间,
            mask: true, // 显示透明蒙层，防止触摸穿透,
            success: res => {
              wx.navigateTo({ url: '../../pages/commonInfo/main' })
            }
          })
        }
      })
    },
    addTrvalUser () {
      addCommonInfo(this.travalUser).then(res => {
        if (res.Code === 200) {
          wx.showToast({
            title: '操作成功！', // 提示的内容,
            icon: 'success', // 图标,
            duration: 2000, // 延迟时间,
            mask: true, // 显示透明蒙层，防止触摸穿透,
            success: res => {
              wx.navigateTo({ url: '../../pages/commonInfo/main' })
            }
          })
        }
      })
    },
    btnEvent () {
      this.validName()
      this.validMobile()
      let valid = !this.travalUserErr.Name && !this.travalUserErr.Mobile && !this.travalUserErr.IdCard
      if (valid) {
        if (this.type === 1) {
          this.addTrvalUser()
        } else if (this.type === 2) {
          this.editTravalUser()
        }
      }
    }
  },
  onLoad () {
    this.initData()
    if (this.$root.$mp.query.travalUser) {
      this.type = 2
      this.travalUser = JSON.parse(this.$root.$mp.query.travalUser)
    } else {
      this.type = 1
    }
  }
}
</script>

<style scope>
.adduser li{
margin: 30rpx;
display: flex;
align-items: center;
border-bottom: 2rpx solid #eee;
height: 80rpx;
line-height: 80rpx;
}
.adduser input,.adduser select{
font-size: 28rpx;
text-align: left;
flex:1;
}
.adduser  span{
  font-size: 30rpx;
  margin-right: 30rpx;
}
.add{
margin: 60rpx 40rpx;
color:#fff;
background: #3D3d3d;
font-size: 32rpx;
letter-spacing: 3px;
}
.err{
  margin: 0 30rpx !important;
}
.err+li{
  border:none;
   margin: 0 30rpx !important;
 
}
</style>
