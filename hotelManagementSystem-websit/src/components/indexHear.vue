<template>
<div class="wrap">
<div class="bg" :style="{ backgroundImage: 'url(' + bg + ')' }"></div>
<div class="bg2" :style="{ backgroundImage: 'url(' + bgblack + ')'}"></div>
</div>
</template>
<script>
import bgblack from '@/assets/images/bgblack.png'
export default {
  data: function () {
    return {
      bgblack
    }
  },
  props: ['bg', 'modal']
}
</script>
<style scope>
.wrap{
 position: relative;
  width: 100%;
  height: 400px;
}
.bg,.bg2{
  position: absolute;
  left:0;
  top:0;
  width: 100vw;
  height: 400px;
  background-position: center center;
  background-size: cover;

}
.bg2{
background-repeat: no-repeat;

}
</style>
