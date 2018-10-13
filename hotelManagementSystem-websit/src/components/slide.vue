<template>
<div class="wrap">

<gallery :images="imageslist" :index="index" @close="index = null"></gallery>
    <div
       class="image"
      @click="index = 0"
      :style="{ backgroundImage: 'url(' + imageslist[0] + ')', width: '400px', height: '420px',marginLeft:0}"
    ></div>
     <div
      class="image"
      v-for="(image, imageIndex) in imageslist"
      :key="imageIndex"
      @click="index = imageIndex"
      :style="{ backgroundImage: 'url(' + image + ')', width: '225px', height: '200px' }"
      v-if="imageIndex!=0&&imageIndex<=6"
    ></div>
</div>
</template>
<script>
import VueGallery from 'vue-gallery'

export default {
  data: function () {
    return {
      index: null
    }
  },
  props: {
    images: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    imageslist () {
      let ims = []
      this.images.forEach(item => {
        ims.push(item.PicPath)
      })
      return ims
    }
  },
  components: {
    'gallery': VueGallery
  }

}
</script>
<style scoped>
.wrap{
width:1200px;
margin: 0 auto;
}
.image{
float: left;
background-position: center center;
margin-left: 30px;
margin-bottom: 20px;
background-size: cover;
background-repeat: no-repeat;
border-radius: 10px;
}

</style>
