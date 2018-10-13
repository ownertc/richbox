
<template>
    <Layout>
        <Header  class="headerbar">
            <headrbar></headrbar>
        </Header>
        <Content>
            <div class="content">
                <img :src="complete" alt="">
                <p class="desc">订单已完成</p>
                <p class="link"><router-link to="/member/order" style="color:#666;font-size:14px;margin-top:30px;">查看订单</router-link><router-link to="/" style="color:#666;font-size:14px;margin-top:30px;">返回官网首页</router-link></p>
            </div>
        </Content>
        <Footer><footerbar></footerbar></Footer>
    </Layout>

</template>

<script>
import complete from '@/assets/images/complete.png'
import headrbar from '@/components/headrbar'
import footerbar from '@/components/footerbar'

// images

export default {
  data () {
    return {
      complete
    }
  },
  components: {
    headrbar,
    footerbar
  }
}
</script>
<style>

</style>

<style scoped>
.content{
min-height:76vh;
display: flex;
align-items:center;
justify-content:center;
    flex-direction: column
}
.desc{
font-size:18px;
font-weight:500;
color:#000;
margin-top:20px;
}
.link{
width:200px;
margin:0 auto;
display:flex;
justify-content:space-between;

}

</style>
