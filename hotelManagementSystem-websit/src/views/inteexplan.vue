
<template>
    <Layout>
        <Header  class="headerbar">
            <index-hear class="header-bg" :bg="headerbg"  :modal="false"></index-hear>
            <navbar class="navbar"></navbar>
        </Header>

        <Content>
        <div class="content">
            <p class="title">会员等级划分</p>
            <table width="100%">
                <tr><td></td><td>v1银卡</td><td>v2金卡</td><td>v3白金卡</td></tr>
               <tr><td>官网/微信</td><td>95折</td><td>9折</td><td>85折</td></tr>
            </table>
              <p class="title">会员积分规则</p>
            <table width="100%">
                <tr><td></td><td>v1银卡</td><td>v2金卡</td><td>v3白金卡</td></tr>
               <tr><td>官网/微信</td><td>1倍积分</td><td>1.2倍积分</td><td>1.5倍积分</td></tr>
            </table>
             <p class="title">会员礼遇</p>
            <table width="100%">
                <tr><td></td><td>v1银卡</td><td>v2金卡</td><td>v3白金卡</td></tr>
               <tr><td>预订保留</td><td>—</td><td>19：00</td><td>20：00</td></tr>
               <tr><td>延迟退房</td><td>—</td><td>13：00</td><td>14：00</td></tr>
               <tr><td>提前预订保证有房</td><td>—</td><td>48小时</td><td>72小时</td></tr>
              <tr ><td>礼券兑换</td><td class="liquan">√</td><td class="liquan">√</td><td class="liquan">√</td></tr>
               <tr><td>免查房</td><td >—</td><td>—</td><td class="liquan">√</td></tr>
            </table>
            <p class="title">权益说明</p>
            <ul class="desc">
                <li>需通过上海德途酒店的官网及微信，预订即可享受以上会员折扣及会员礼遇，在前台预订只享受门市价入住;</li>
                <li>房价折扣以门市价为基础，部分酒店的折扣以网络基准价为基础，具体价格以分店列表显示的为准;</li>
                <li>新注册会员赠20元订房券，在官网及微信订房每消费1元可获得1积分</li>
                <li>银卡：随时免费办理；</li>
                <li>金卡：1年内完成15 -49晚住宿可免费升级获得此卡。优先登记入住，确保抵达时已备好客房与房卡。订房可获得1.2倍的积分。同时
享有银卡所有权限;
</li>
                <li>白金卡：1年内完成50晚以上住宿可免费获得此卡，免费客房升级，空余客房保证(需提前72小时预订)，订房可获得1.5倍的积分。
同时享有银卡及金卡所有权限。(备注: 次年订房未达到50晚住宿即调整为金卡权限);
</li>
            </ul>
        </div>
        </Content>
        <Footer><footerbar></footerbar></Footer>
    </Layout>

</template>

<script>
import headrbar from '@/components/headrbar'
import footerbar from '@/components/footerbar'
import indexHear from '@/components/indexHear'
import navbar from '@/components/navbar'
import headerbg from '@/assets/images/bg3.png'

// images

export default {
  data () {
    return {
      headerbg
    }
  },
  components: {
    headrbar,
    footerbar,
    indexHear,
    navbar
  }
}
</script>
<style scoped>
.headerbar {
  width: 100%;
  height: 400px;
  position: relative;
}
.header-bg {
  position: absolute;
  top: 0;
  left: 0;
}

.navbar {
  position: absolute;
  left: 0;
  top: 10px;
  z-index: 999;
}
.content{
width: 1200px;
min-height: 100vh;
margin: 0 auto;
padding-top:50px;
}
.title{
font-size: 16px;
color:#000;
padding: 20px 0;
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
background: #eee;
}

table,table tr th, table tr td {
     background: #fff;
    border:1px solid #cccc;
    }
table {
 border-collapse: collapse;
  padding:2px;
  margin-bottom: 20px;
 }

td{
height: 50px;
line-height: 50px;
text-align: center;
font-size: 14px;
color:#666;
}
.liquan {
font-weight: 700;
font-size: 20px;
color:#ffa500;
}
.desc{
font-size: 14px;
}
.desc li{
 margin-bottom: 10px;
  line-height: 2;
}
.desc li::before{
   content: "";
   display: inline-block;
   width:0;
    height:0;
    border-width:5px 0 5px 5px;
    border-style:solid;
    border-color:transparent transparent transparent #ffa500;/*透明 透明 透明 灰*/
    margin-right: 10px;
}
</style>
