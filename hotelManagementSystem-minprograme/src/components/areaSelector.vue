<template> 
<!--index.wxml-->
<div>
<!--index.wxml-->
<div class="mask"  v-if="condition">
  </div>
<view  class="citypicker"   v-if="condition">
  <picker-view indicator-style="height: 50px;" style="width: 100%; height: 300px;" :value="value" @change="bindChange" class="citybody">
    <view class="cityheader">
      <view @tap="cancle" class="city-cancel">取消</view>
      <view @tap="ok" class="city-true">确定</view>
    </view>
    <picker-view-column>
      <view v-for="(item,index) in provinces" :key="index" style="line-height: 50px;padding-left:10px;">{{item.value}}</view>
    </picker-view-column>
    <picker-view-column>
      <view v-for="(item,index) in citys" :key="index" style="line-height: 50px;padding-left:10px;">{{item.value}}</view>
    </picker-view-column>
    <picker-view-column>
      <view  v-for="(item,index) in countys" :key="index" style="line-height: 50px;padding-left:10px;">{{item.value}}</view>
    </picker-view-column>
  </picker-view>
</view>

</div>
</template>

<script>
import data from '@/asset/js/areaData.json'
export default {
  data () {
    return {
      provinces: [],
      province: '',
      citys: [],
      city: '',
      countys: [],
      county: '',
      value: [0, 0, 0],
      values: [0, 0, 0],
      condition: false
    }
  },
  computed: {

  },
  methods: {
    bindChange: function (e) {
      var val = e.target.value
      var t = this.values
      var cityData = data.Data

      if (val[0] !== t[0]) {
        const citys = []
        const countys = []

        for (let i = 0; i < cityData[val[0]].Children.length; i++) {
          citys.push({key: cityData[val[0]].Children[i].Key, value: cityData[val[0]].Children[i].Value})
        }
        for (let i = 0; i < cityData[val[0]].Children[0].Children.length; i++) {
          countys.push({key: cityData[val[0]].Children[0].Children[i].Key, value: cityData[val[0]].Children[0].Children[i].Value})
        }

        this.province = this.provinces[val[0]]
        this.city = cityData[val[0]].Children[0].Value
        this.citys = citys
        this.county = cityData[val[0]].Children[0].Children[0].Value
        this.countys = countys
        this.values = val
        this.value = [val[0], 0, 0]
        return
      }
      if (val[1] !== t[1]) {
        const countys = []
        for (let i = 0; i < cityData[val[0]].Children[val[1]].Children.length; i++) {
          countys.push({key: cityData[val[0]].Children[val[1]].Children[i].Key, value: cityData[val[0]].Children[val[1]].Children[i].Value})
        }

        this.city = this.citys[val[1]]
        this.county = cityData[val[0]].Children[val[1]].Children[0].Value
        this.countys = countys
        this.values = val
        this.value = [val[0], val[1], 0]

        return
      }
      if (val[2] !== t[2]) {
        this.county = this.countys[val[2]]
        this.values = val
      }
    },
    open () {
      this.condition = !this.condition
    },
    cancle () {
      this.condition = false
    },
    ok () {
      var ids = [this.provinces[this.value[0]].key, this.citys[this.value[1]].key, this.countys[this.value[2]].key]
      var desc = `${this.provinces[this.value[0]].value}-${this.citys[this.value[1]].value}-${this.countys[this.value[2]].value}`
      this.$emit('change', {ids, desc})
      this.condition = !this.condition
    }
  },

  mounted () {
    var cityData = data.Data
    const provinces = []
    const citys = []
    const countys = []

    for (let i = 0; i < cityData.length; i++) {
      provinces.push({key: cityData[i].Key, value: cityData[i].Value})
    }

    for (let i = 0; i < cityData[0].Children.length; i++) {
      citys.push({key: cityData[0].Children[i].Key, value: cityData[0].Children[i].Value})
    }

    for (let i = 0; i < cityData[0].Children[0].Children.length; i++) {
      countys.push({key: cityData[0].Children[0].Children[i].Key, value: cityData[0].Children[0].Children[i].Value})
    }
    this.provinces = provinces
    this.citys = citys
    this.countys = countys
    this.province = cityData[0].Value
    this.city = cityData[0].Children[0].Value
    this.county = cityData[0].Children[0].Children[0].Value
  }

}
</script>

<style scoped>
/**app.wxss**/
.mask{
  position: fixed;
  top:0;
  bottom: 0;
  width:100vw;
  height: 100%;
  opacity: 0.5;
  background: #000;
  z-index: 999999;
}
.container {
  position: absolute;
  height: 100%;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  box-sizing: border-box;
  background-color: #f8f8f8;
} 

.citypickers{
  position: fixed;
  height: 100%;
  width: 100%;
  min-height: 100%;
  background-color: #fff;
}

.citypicker{
  background:#fff;
}
.citybody {
  position: fixed;
  bottom: 0px;
  background: #fff;
  z-index: 99999999999999999;
}

.cityheader {
  position: absolute;
  top:0px;
  width: 100%;
  z-index: 4;
}

.city-cancel {
  float: left;
  margin: 20rpx;
  color: #818181;
}

.city-true {
  float: right;
  margin: 20rpx;
  color: #2FB42E
}

.section .picker {
  background-color: #fff;
  border-bottom: 1px #d9d9d9 solid;
  border-top: 1px #d9d9d9 solid;
  padding: 20rpx;
}
/**index.wxss**/
.input {
  padding-top: 300rpx;
  width: 100%;
}

.input input {
  width: 100%;
  background-color: #fff;
  border-bottom: 1px #d9d9d9 solid;
  border-top: 1px #d9d9d9 solid;
  padding: 20rpx 50rpx;
}

.section {
  padding-top: 20rpx;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 200px;
}
</style>
