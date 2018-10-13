
<template>
    <Layout>
        <Header  class="headerbar">
            <headrbar></headrbar>
        </Header>
        <Content>
aqDSFDYTRY
        </Content>
        <Footer><footerbar></footerbar></Footer>
    </Layout>

</template>

<script>
import headrbar from '@/components/headrbar'
import footerbar from '@/components/footerbar'

// images
import one1 from '@/assets/images/one1-1.png'
import one2 from '@/assets/images/one1-2.png'
import one3 from '@/assets/images/one1-3.png'
import one4 from '@/assets/images/one1-4.png'
import headerbg from '@/assets/images/1d.jpg'
import food from '@/assets/images/food.png'
import join from '@/assets/images/join.png'

export default {
  data () {
    return {
      one1,
      one2,
      one3,
      one4,
      headerbg,
      food,
      join,
      value2: 0

    }
  },
  components: {
    headrbar,
    footerbar
  }
}
</script>
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

</style>
