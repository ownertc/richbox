
<template>
  <div>
   <ul class="adduser">
     <li><span>发票类型</span> 
     <picker  :range="CertificatesTypeArr"  @change="selectCertype($event)" :value="taxTypeIndex">
    <view class="picker" style="font-size:30rpx;">
       {{CertificatesTypeArr[taxTypeIndex]}}
    </view></picker></li>
     <li :class="{'err':invoiceErr.InvoiceName}"><span>发票抬头</span><input type="text" name="" id="" placeholder="请输入发票抬头" v-model="invoice.InvoiceName" @input="validInvoiceName()"></li>
     <li  style="color:red;font-size:26rpx" v-if="invoiceErr.InvoiceName">{{invoiceErr.InvoiceName}}</li>
     <div v-if="taxTypeIndex==0">
          <li :class="{'err':invoiceErr.IdentifyNumber}"><span>纳税人识别号</span><input type="text" name="" id="" placeholder="请输入纳税人识别号，至少15位" v-model="invoice.IdentifyNumber" @input="validIdentifyNumber()"></li>
          <li  style="color:red;font-size:26rpx" v-if="invoiceErr.IdentifyNumber">{{invoiceErr.IdentifyNumber}}</li>
          <li><span>如需要增值税专用发票,请把信息填写完整</span></li>
          <li :class="{'err':invoiceErr.CompanyAddress}"><span>公司地址</span><input type="text" placeholder="请输入公司地址"  v-model="invoice.CompanyAddress" @input="validCompanyAddress()"></li>
          <li  style="color:red;font-size:26rpx" v-if="invoiceErr.CompanyAddress">{{invoiceErr.CompanyAddress}}</li>
          <li :class="{'err':invoiceErr.CompanyPhone}"><span>公司电话</span><input type="text" placeholder="请输入公司电话"  v-model="invoice.CompanyPhone" @input="validCompanyPhone()"></li>
          <li  style="color:red;font-size:26rpx" v-if="invoiceErr.CompanyPhone">{{invoiceErr.CompanyPhone}}</li>
          <li :class="{'err':invoiceErr.BankName}"><span>开户银行名称</span><input type="text" placeholder="请输入开户银行名称"  v-model="invoice.BankName" @input="validBankName()"></li>
          <li  style="color:red;font-size:26rpx" v-if="invoiceErr.IdCard">{{invoiceErr.BankName}}</li>
          <li :class="{'err':invoiceErr.BankAccount}"><span>开户银行账号</span><input type="text" name="" id="" placeholder="请输入开户银行账号" v-model="invoice.BankAccount" @input="validBankAccount()"></li>
          <li  style="color:red;font-size:26rpx" v-if="invoiceErr.BankAccount">{{invoiceErr.BankAccount}}</li>
      </div>
   </ul>
    <button class="add" @click="btnEvent()">保存</button>
  </div>
</template>

<script>
import {pushInvoiceHeader, invoiceHeaderDetail, invoiceHeaderEdite} from '@/utils/api'
import {checkTaxpayerId} from '@/utils/index'
export default {
  data () {
    return {
      CertificatesTypeArr: ['企业', '个人'],
      InvoiceType: [
        {
          'Key': 'ITAAQY0001',
          'Value': '企业'
        },
        {
          'Key': 'ITAAGR0001',
          'Value': '个人'
        }
      ],
      taxTypeIndex: 0,
      type: 1, // 1为新增2为编辑
      invoice: {
        InvoiceName: '', // 发票抬头
        IdentifyNumber: '', // 纳税人识别号
        InvoiceType: 'ITAAQY0001', // 发票类型
        CompanyAddress: '', // 公司地址
        CompanyPhone: '', // 公司电话
        BankName: '', // 开户银行名称
        BankAccount: '' // 开户银行账号
      },
      invoiceErr: {
        InvoiceName: '',
        IdentifyNumber: '',
        CompanyAddress: '',
        CompanyPhone: '',
        BankName: '',
        BankAccount: ''
      }
    }
  },
  methods: {
    initData () {
      this.type = 1 // 1为新增2为编辑
      this.invoice.InvoiceName = ''
      this.invoice.IdentifyNumber = ''
      this.invoice.InvoiceType = 'ITAAQY0001'
      this.invoice.CompanyAddress = ''
      this.invoice.CompanyPhone = ''
      this.invoice.BankName = ''
      this.invoiceErr.BankAccount = ''
      this.taxTypeIndex = 0
      this.invoiceErr.InvoiceName = ''
      this.invoiceErr.IdentifyNumber = ''
      this.invoiceErr.InvoiceType = ''
      this.invoiceErr.CompanyAddress = ''
      this.invoiceErr.CompanyPhone = ''
      this.invoiceErr.BankName = ''
      this.invoiceErr.BankAccount = ''
    },
    validInvoiceName () {
      this.invoice.InvoiceName = this.invoice.InvoiceName.trim()
      if (!this.invoice.InvoiceName) {
        this.invoiceErr.InvoiceName = '请输入开票抬头'
      } else {
        this.invoiceErr.InvoiceName = ''
      }
    },
    validIdentifyNumber () {
      this.invoice.IdentifyNumber = this.invoice.IdentifyNumber.trim()
      if (!this.invoice.IdentifyNumber) {
        this.invoiceErr.IdentifyNumber = '请输入纳税人识别号'
      } else if (checkTaxpayerId(this.invoice.IdentifyNumber)) {
        this.invoiceErr.IdentifyNumber = '请输入合法的纳税人识别号'
      } else {
        this.invoiceErr.IdentifyNumber = ''
      }
    },
    validCompanyAddress () {
      this.invoice.CompanyAddress = this.invoice.CompanyAddress.trim()
      if (!this.invoice.CompanyAddress) {
        this.invoiceErr.CompanyAddress = '请输入公司地址'
      } else {
        this.invoiceErr.CompanyAddress = ''
      }
    },
    validCompanyPhone () {
      this.invoice.CompanyPhone = this.invoice.CompanyPhone.trim()
      if (!this.invoice.CompanyPhone) {
        this.invoiceErr.CompanyPhone = '请输入公司电话'
      } else {
        this.invoiceErr.CompanyPhone = ''
      }
    },
    validBankName () {
      this.invoice.BankName = this.invoice.BankName.trim()
      if (!this.invoice.BankName) {
        this.invoiceErr.BankName = '请输入开户银行名称'
      } else {
        this.invoiceErr.BankName = ''
      }
    },
    validBankAccount () {
      this.invoice.BankAccount = this.invoice.BankAccount.trim()
      if (!this.invoice.BankAccount) {
        this.invoiceErr.BankAccount = '请输入开户银行账号'
      } else {
        this.invoiceErr.BankAccount = ''
      }
    },
    selectCertype (e) {
      this.taxTypeIndex = e.target.value
      this.invoice.InvoiceType = this.InvoiceType[e.target.value].Key
    },
    editTravalUser () {
      invoiceHeaderEdite(this.invoice.Id, this.invoice).then(res => {
        if (res.Code === 200) {
          wx.showToast({
            title: '操作成功！', // 提示的内容,
            icon: 'success', // 图标,
            duration: 2000, // 延迟时间,
            mask: true, // 显示透明蒙层，防止触摸穿透,
            success: res => {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      })
    },
    getDetail (id) {
      invoiceHeaderDetail(id).then(res => {
        if (res.Code === 200) {
          this.invoice = res.Data
          if (this.invoice.InvoiceType === 'ITAAQY0001') {
            this.taxTypeIndex = 0
          } else if (this.invoice.InvoiceType === 'ITAAGR0001') {
            this.taxTypeIndex = 1
          }
        }
      })
    },
    addInvoice () {
      pushInvoiceHeader(this.invoice).then(res => {
        if (res.Code === 200) {
          wx.setStorageSync('invoiceHeader', JSON.stringify(this.invoice))
          wx.showToast({
            title: '操作成功！', // 提示的内容,
            icon: 'success', // 图标,
            duration: 2000, // 延迟时间,
            mask: true, // 显示透明蒙层，防止触摸穿透,
            success: res => {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      })
    },
    btnEvent () {
      let valid = false
      if (this.invoice.InvoiceType === 'ITAAQY0001') {
        this.validInvoiceName()
        this.validIdentifyNumber()
        this.validCompanyAddress()
        this.validCompanyPhone()
        this.validBankName()
        this.validBankAccount()
        valid = !this.invoiceErr.InvoiceName && !this.invoiceErr.IdentifyNumber && !this.invoiceErr.CompanyAddress && !this.invoiceErr.CompanyPhone && !this.invoiceErr.BankName && !this.invoiceErr.BankAccount
      } else if (this.invoice.InvoiceType === 'ITAAGR0001') {
        this.validInvoiceName()
        valid = !this.invoiceErr.InvoiceName
      }
      if (valid) {
        if (this.type === 1) {
          this.addInvoice()
        } else if (this.type === 2) {
          this.editTravalUser()
        }
      }
    }
  },
  onLoad () {
    this.initData()
    if (this.$root.$mp.query.id) {
      this.type = 2
      this.getDetail(this.$root.$mp.query.id)
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
