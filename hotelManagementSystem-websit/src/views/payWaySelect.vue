
<template>
    <Layout>
        <Header  class="headerbar">
            <headrbar></headrbar>
        </Header>
        <Content>
            <div class="content">
             <p class="title">选择支付方式</p>
             <div class="payway">
              <p class="order-info"><span>{{$route.params.guestRoomTypeName}}</span><span>支付金额：</span><span class="price">￥{{$route.params.ActPrice}}</span></p>
             <RadioGroup v-model="payway" style="margin-top:50px;">
                    <Radio label="ZFB" class="checkbox-item">
                       <img :src="paylogo" alt="">
                        <span class="name">支付宝</span>
                    </Radio>
                    <Radio label="WX" class="checkbox-item">
                        <img :src="wxlogo" alt="">
                        <span class="name">微信</span>
                    </Radio>
              </RadioGroup>
             </div>
             <div class="btn"><Button type="warning" style="font-size:16px"><router-link :to="{name:'paycode',query:{orderId:$route.params.Id,payway:payway,guestRoomTypeName:$route.params.guestRoomTypeName,ActPrice:$route.params.ActPrice}}"  style="color:#fff;">去支付吧</router-link></Button></div>
            </div>
        </Content>
        <Footer><footerbar></footerbar></Footer>
    </Layout>

</template>

<script>
import headrbar from '@/components/headrbar'
import footerbar from '@/components/footerbar'

// images
import wxlogo from '@/assets/images/wxlogo.png'
import paylogo from '@/assets/images/paylogo.png'

export default {
  data () {
    return {
      wxlogo,
      paylogo,
      value2: 0,
      payway: 'ZFB'

    }
  },
  components: {
    headrbar,
    footerbar
  }
}
</script>

<style scoped>
.order-info span{
font-size:16px;
margin-right:10px;
color:#000;

}
.order-info span.price{
color:#f94;
margin-right:0px;
}
.checkbox-item{
margin-right:80px;
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
    height: 50px;
    position: relative;
}
.content{
width:1200px;
margin: 0 auto;
}
.title{
margin:20px 0;
font-size:18px;
color:#444;
letter-spacing:2px;
border-bottom:1px solid #eee;
padding: 20PX 0;
}
.name{
position: relative;
left:20px;
bottom:20px;
font-size:14px;
color:#333;
}
.payway{
    border-bottom:1px solid #eee;
    padding-bottom:20px;
}
.btn{
padding-left:40px;
padding-top:40px;
}
</style>
