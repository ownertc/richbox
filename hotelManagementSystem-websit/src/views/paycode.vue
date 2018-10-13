
<template>
    <Layout>
        <Header  class="headerbar">
            <headrbar></headrbar>
        </Header>
        <Content>
            <div class="content">
              <p class="title">{{payWay}}支付</p>
             <div class="payway">
              <p class="order-info"><span>{{$route.query.GuestRoomTypeName}}</span><span>支付金额：</span><span class="price">￥{{$route.query.ActPrice}}</span></p>
             </div>
             <div class="paycode">
                <img :src="payCodeurl" alt="">
                <P style="margin-top:20px;">请打开手机{{payWay}}的"扫一扫"</P>
                <P>扫描上方二维码进行支付(如果付款码未展示，请<span style="color:#f94;cursor:pointer" @click="refresh()">刷新页面</span>))</P>
             </div>
            </div>
        </Content>
        <Footer><footerbar></footerbar></Footer>
    </Layout>

</template>

<script>
import headrbar from '@/components/headrbar'
import footerbar from '@/components/footerbar'
import {orderDetail} from '@/api/order'
import {GetImgByWx, GetImgByAlipay} from '@/api/payCode'
import Cookies from 'js-cookie'
// images
export default {
  data () {
    return {
      order: {},
      payCodeurl: '',
      payWay: '',
      id: this.$route.query.orderId,
      inteId: 0
    }
  },
  components: {
    headrbar,
    footerbar
  },
  methods: {

    // 微信付款码生成
    wxPay () {
      GetImgByWx(this.$route.query.orderId).then(res => {
        return 'data:image/png;base64,' + btoa(
          new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
      })
        .then(data => {
          this.payCodeurl = data
          this.payWay = '微信'
        })
        .catch(ex => {
          console.error(ex)
        })
    },
    // 支付宝付款码生成
    zfbPay () {
      GetImgByAlipay(this.$route.query.orderId).then(res => {
        return 'data:image/png;base64,' + btoa(
          new Uint8Array(res.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
      })
        .then(data => {
          this.payCodeurl = data
          this.payWay = '支付宝'
        })
        .catch(ex => {

        })
    },
    // 轮询支付结果
    getPayResult () {
      this.inteId = setInterval(() => {
        orderDetail(this.$route.query.orderId).then(res => {
          if (res.data.Code === 200) {
            this.order = res.data.Data
            if (res.data.Data.PayStatus === 'OSAYZF0001') {
              this.$router.push({'path': '/paySuccess'})
              clearInterval(this.inteId)
            }
          }
        })
      }, 2000)
    },
    refresh () {
      location.reload()
    }
  },
  mounted () {
    if (Cookies.get('usertoken')) {
      if (this.$route.query.orderId) {
        if (this.$route.query.payway === 'WX') {
          this.wxPay()
        }
        if (this.$route.query.payway === 'ZFB') {
          this.zfbPay()
        }
      } else {
        this.$router.push({name: 'index'})
      }
    } else {
      this.$router.push({name: 'login'})
    }

    this.getPayResult()
  },
  beforeDestroy () {
    clearInterval(this.inteId)
  }
}
</script>

<style scoped>
.checkbox-item{
margin-right:80px;
}
.ivu-layout-content{
    position: relative;
    top:0;
    bottom: 0;
    min-height: 76vh;
    width: 100vw;
}
.headerbar{
    width: 100%;
    position: relative;
}
.content{
width:1200px;
margin: 0 auto;
}
.order-info span{
font-size:16px;
margin-right:10px;
color:#000;

}
.order-info span.price{
color:#f94;
margin-right:0px;
}
.title{
margin:20px 0;
font-size:18px;
color:#444;
letter-spacing:2px;
border-bottom:1px solid #eee;
padding: 20PX 0;
}
.paycode{
    text-align:center;
    width:800px;
}
.paycode img{
    width:250px;
    height: 250px;
    margin-top:80px;
    border:1px solid #333;
}

.paycode p{
    font-size:14px;
}
</style>
