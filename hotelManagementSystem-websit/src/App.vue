<template>
  <div>
 <transition name="slide-fade">
<router-view></router-view>
 </transition>
  </div>
</template>

<script>
import HotelDatePicker from 'vue-hotel-datepicker'
export default {

  data: function () {
    return {

    }
  },
  components: {
    HotelDatePicker
  },
  mounted () {

  }

}
</script>
<style >
 .anchorBL{
   display: none;
 }
.ivu-layout-footer{
  background: #ccc !important;
  width:100vw;
  height: 80px;
  padding: 0 !important;
}
.ivu-page-item-active,.ivu-page-item:hover {
border-color: #f94 !important ;
}
.ivu-page-item-active a, .ivu-page-item-active:hover a{
color: #f94 !important;
}
ul,li{
  list-style: none;
}
.ivu-layout-footer,.ivu-layout-header{
padding: 0;
}
.ivu-layout-header{
height: 80px ;
padding: 0 !important;
}
.ivu-btn-primary,.ivu-btn-primary:hover{
background: #f94 !important;
border:1px solid #f94  !important;
color: #fff  !important;
}
.ivu-btn-text:hover{
  color:#f94  !important;
}
.slide-fade{
  position: absolute;left:0;right: 0;
}
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {

  transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
  left:0;right: 0;
  transform: translateX(50px);
  opacity: 0;
}
.ivu-layout-header{
background: #1A1818;
height: 80PX;
}
ul,li{
list-style: none;
}
*{
  box-sizing: border-box !important;
}

.ivu-layout-footer,.ivu-layout-header{
  padding: 0
}
.ivu-picker-panel-body{
  background: #fff;
}
</style>
