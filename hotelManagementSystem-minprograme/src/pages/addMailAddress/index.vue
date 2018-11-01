<template>
  <div>
   <ul class="adduser">
     <li :class="{'err':mailAddressErr.ReceiverName}"><span>姓名</span><input type="text" name="" id="" placeholder="请输入姓名(与证件名一致)" v-model="mailAddress.ReceiverName" @blur="validName()"></li>
     <li  style="color:red;font-size:26rpx" v-if="mailAddressErr.ReceiverName">{{mailAddressErr.ReceiverName}}</li>
     <li :class="{'err':mailAddressErr.ReceiverPhoneNumber}"><span>联系电话</span><input type="text" name="" id="" placeholder="请输入联系电话" v-model="mailAddress.ReceiverPhoneNumber" @blur="validMobile()"></li>
     <li  style="color:red;font-size:26rpx" v-if="mailAddressErr.ReceiverPhoneNumber">{{mailAddressErr.ReceiverPhoneNumber}}</li>
     <li @tap="open"><span>所在地区</span>
    <view class="picker" style="font-size:30rpx" @click="showPicker">
     {{region}}
    </view></li>
     <li :class="{'err':mailAddressErr.AddressInfo}"><span>详细地址</span><input type="text" placeholder="请输入地址"  v-model="mailAddress.AddressInfo" @blur="validAddress()"></li>
     <li  style="color:red;font-size:26rpx" v-if="mailAddressErr.AddressInfo">{{mailAddressErr.AddressInfo}}</li>
      <li :class="{'err':mailAddressErr.PostalCode}"><span>邮政编码</span><input type="text" name="" id="" placeholder="请输入邮政编码" v-model="mailAddress.PostalCode" @blur="validPostCode()"></li>
      <li  style="color:red;font-size:26rpx" v-if="mailAddressErr.PostalCode">{{mailAddressErr.PostalCode}}</li>
   </ul>
     <area-selector ref="areaPicker" @change="getArea"></area-selector>
    <button class="add" @click="btnEvent()" v-if="btnStatus">保存</button>
     <button class="add"  v-if="!btnStatus">保存</button>
   
  </div>
</template>

<script>
import {mailAddressAdd, mailAddressEdite, mailAddressDetail} from '@/utils/api'
import areaSelector from '@/components/areaSelector'
export default {
  data () {
    return {
      btnStatus: true,
      type: 1, // 1为新增2为编辑
      region: '请选择省市区',
      addInp: true,
      mailAddress: {
        ReceiverName: '',
        ReceiverPhoneNumber: '',
        AddressProvince: '',
        AddressCity: '',
        AddressArea: '',
        AddressInfo: '',
        PostalCode: ''
      },
      mailAddressErr: {
        ReceiverName: '',
        ReceiverPhoneNumber: '',
        AddressInfo: '',
        PostalCode: ''
      }
    }
  },
  components: {
    areaSelector
  },
  methods: {
    getArea (data) {
      this.region = data.desc
      this.mailAddress.AddressProvince = data.ids[0]
      this.mailAddress.AddressCity = data.ids[1]
      this.mailAddress.AddressArea = data.ids[2]
    },
    open () {
      this.$refs.areaPicker.open()
    },
    initData () {
      this.type = 1 // 1为新增2为编辑
      this.mailAddress.ReceiverName = ''
      this.mailAddress.ReceiverPhoneNumber = ''
      this.mailAddress.AddressCity = ''
      this.mailAddress.AddressArea = ''
      this.mailAddress.AddressInfo = ''
      this.mailAddress.PostalCode = ''
      this.mailAddress.AddressProvince = ''
      this.mailAddressErr.ReceiverName = ''
      this.mailAddressErr.ReceiverPhoneNumber = ''
      this.mailAddressErr.AddressInfo = ''
      this.mailAddressErr.PostalCode = ''
    },
    validName () {
      this.mailAddress.ReceiverName = this.mailAddress.ReceiverName.trim()
      if (!this.mailAddress.ReceiverName) {
        this.mailAddressErr.ReceiverName = '请输入用户名'
      } else if (this.mailAddress.ReceiverName.length > 10 || this.mailAddress.ReceiverName.length < 2) {
        this.mailAddressErr.ReceiverName = '用户名2-10位'
      } else {
        this.mailAddressErr.ReceiverName = ''
      }
    },
    validMobile () {
      this.mailAddress.ReceiverPhoneNumber = this.mailAddress.ReceiverPhoneNumber.trim()
      if (!this.mailAddress.ReceiverPhoneNumber) {
        this.mailAddressErr.ReceiverPhoneNumber = '请输入电话号码'
      } else if (!(/^1[34578]\d{9}$/.test(this.mailAddress.ReceiverPhoneNumber))) {
        this.mailAddressErr.ReceiverPhoneNumber = '请输入合法的电话号码'
      } else {
        this.mailAddressErr.ReceiverPhoneNumber = ''
      }
    },
    validAddress () {
      this.mailAddress.AddressInfo = this.mailAddress.AddressInfo.trim()
      if (!this.mailAddress.AddressInfo) {
        this.mailAddressErr.AddressInfo = '请输入详细地址'
      } else {
        this.mailAddressErr.AddressInfo = ''
      }
    },
    validPostCode () {
      this.mailAddress.PostalCode = this.mailAddress.PostalCode.trim()
      if (!this.mailAddress.PostalCode) {
        this.mailAddressErr.PostalCode = '请输入邮政编码'
      } else if (!(/^[1-9][0-9]{5}$/.test(this.mailAddress.PostalCode))) {
        this.mailAddressErr.PostalCode = '邮政编码格式正确'
      } else {
        this.mailAddressErr.PostalCode = ''
      }
    },
    editMailAddress () {
      mailAddressEdite(this.mailAddress.Id, this.mailAddress).then(res => {
        if (res.Code === 200) {
          this.btnStatus = true
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
    addMailAddress () {
      mailAddressAdd(this.mailAddress).then(res => {
        this.btnStatus = true
        if (res.Code === 200) {
          wx.showToast({
            title: '操作成功！', // 提示的内容,
            icon: 'success', // 图标,
            duration: 2000, // 延迟时间,
            mask: true, // 显示透明蒙层，防止触摸穿透,
            success: res => {
              wx.navigateBack({
                delta: 1 // 返回的页面数，如果 delta 大于现有页面数，则返回到首页,
              })
            }
          })
        }
      })
    },
    btnEvent () {
      this.validName()
      this.validMobile()
      this.validPostCode()
      this.validAddress()
      let valid = !this.mailAddressErr.ReceiverName && !this.mailAddressErr.ReceiverPhoneNumber && !this.mailAddressErr.PostalCode && !this.mailAddressErr.AddressInfo
      if (valid) {
        this.btnStatus = false
        if (this.type === 1) {
          this.addMailAddress()
        } else if (this.type === 2) {
          this.editMailAddress()
        }
      }
    }
  },
  onLoad () {
    this.initData()
    if (this.$root.$mp.query.id) {
      this.type = 2
      mailAddressDetail(this.$root.$mp.query.id).then(res => {
        this.mailAddress = res.Data
      })
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