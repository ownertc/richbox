<template>
  <div>
   <ul class="adduser">
     <li><span>真实姓名</span><input type="text" name="" id="" placeholder="李晓明"></li>
     <li><span>联系电话</span><input type="text" name="" id="" placeholder="1737657585688"></li>
     <li><span>电子邮箱</span><input type="text" name="" id="" placeholder="wdjidjjd@163.com"></li>
     <li><span>性别</span> <picker bindchange="bindPickerChange" :value="index" :range="sex">
    <view class="picker">
      <span style="color:#666">选择性别</span>
         {{sex[index]}}
    </view>
  </picker></li>
     <li><span>出生年月</span>  <picker mode="date" :value="date" start="1900-01-01" end="2019-09-01" @change="bindDateChange($event)">
    <view class="picker">
        <span style="color:#666" v-if="datePlace">选择日期</span> {{date}}
    </view>
  </picker></li>
   </ul>
    <button class="add">保存</button>
  </div>
</template>

<script>

export default {
  data () {
    return {
      sex: ['男', '女'],
      date: '2016-01-01',
      datePlace: true
    }
  },
  methods: {
    bindDateChange (e) {
      this.datePlace = false
      this.date = e.target.value
    }
  }
}
</script>

<style scope>
.picker{
  font-size: 28rpx;
}
.adduser li{
margin: 30rpx;
display: flex;
align-items: center;
border-bottom: 2rpx solid #eee;
height: 80rpx;
line-height: 80rpx;
}
.adduser input,.adduser select{
font-size: 28rpx;
text-align: left;
flex:1;
}
.adduser  span{
  font-size: 30rpx;
  margin-right: 30rpx;
}
.add{
margin: 60rpx 40rpx;
color:#fff;
background: #3D3d3d;
font-size: 32rpx;
letter-spacing: 3px;
}
</style>
