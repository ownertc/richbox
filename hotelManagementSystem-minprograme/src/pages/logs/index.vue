<template>
  <div>
    <p @tap="open">激动万分的个股</p>
   <card @change="getArea" ref="card"></card>
  </div>
</template>

<script>

import card from '@/components/areaSelector'

export default {
  components: {
    card
  },

  data () {
    return {
      logs: []
    }
  },
  methods: {
    open () {
      this.$refs.card.open()
    },
    getArea (data) {
      console.log(data)
    }
  },
  created () {

  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
