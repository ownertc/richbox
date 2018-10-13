<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>
      <button @click="increame">+</button>
      <button @click="decream">-</button>
    </p>
  <card :text="count"/>
    <a href="/pages/index/main" class="home">去往首页1</a>
  </div>
</template>

<script>
import card from '@/components/card'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    card
  },
  computed: {
    ...mapGetters(['count'])
  },
  methods: {
    ...mapMutations(['increame', 'decream'])
  },
  mounted () {

  }
}
</script>
<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
