<template>
<div class="serchBtn-app">
    <Select v-model="model1" style="width:200px" @on-change="getCity">
        <Option v-for="(item,index) in cityLists" :value="item.Value" :key="index">{{ item.Value }}</Option>
    </Select>
   <div class="data-picker"><span  @click="getDayStart()">{{dateBegin}}</span><span>--</span><span  @click="getDayEnd()">{{dateEnd}}</span></div>
   <div class="dataPicker" v-if="datepicker">
     <calendar class="event-calendar" :value="'value'"  :placeholder="'placeholder'" :pane="2" :has-input="false" format="yyyy-MM-dd" lang="zh" @selectDay="selectDay">
    <!--     <div style="color:#666;font-size:10px;position:relative;top:-6px"  v-for="(evt,index) in events" :slot="evt.DateIndex" :key="index">￥{{evt.Price}}</div> -->
  </calendar>
   </div>
   <Button type="warning" class="serch" @click="goSeacher()">搜索酒店</Button>
</div>
</template>
<script>
import {GetHotelCalendarList} from '@/api/hotel'
import {cityList} from '@/api/area'
import calendar from '@/components/caledern'
import {parseTime} from '@/utils/index'
export default {
  data () {
    return {
      datepicker: false,
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      cityLists: [],
      model1: '6401',
      checkDayType: '',
      dateBegin: '入住日期',
      currBegin: parseTime(new Date()),
      currEnd: parseTime(new Date(new Date(parseTime(new Date())).valueOf() + 24 * 60 * 60 * 1000)),
      dateEnd: '退房日期'
    }
  },
  components: {
    calendar
  },
  methods: {
    getCity (value) {
      this.cityLists.forEach(item => {
        if (item.Value === value) {
          sessionStorage.setItem('cityKey', item.Key)
          sessionStorage.setItem('city', item.Value)
          this.$emit('getCity', item.Key)
        }
      })
    },
    getCalendarEvents () {
      GetHotelCalendarList({hotelId: 0, userId: 0}).then(res => {
        res.data.Data.forEach(item => {
          let time = new Date(item.DateIndex)
          item.DateIndex = this.stringify(time, 'yyyy-MM-dd')
        })
        this.events = res.data.Data
      })
    },
    parseMonth (date) {
      return this.months[date.getMonth()]
    },
    stringify (date, format) {
      if (!date) return ''
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const monthName = this.parseMonth(date)
      return format
        .replace(/yyyy/g, year)
        .replace(/MMMM/g, monthName)
        .replace(/MMM/g, monthName.substring(0, 3))
        .replace(/MM/g, ('0' + month).slice(-2))
        .replace(/dd/g, ('0' + day).slice(-2))
        .replace(/yy/g, year)
        .replace(/M(?!a)/g, month)
        .replace(/d/g, day)
    },
    getAreaList () {
      cityList().then(res => {
        if (res.data.Code === 200) {
          this.cityLists = res.data.Data
          this.cityLists.unshift({Key: 0, Value: '全部'})
        }
      })
    },
    getDayStart () {
      this.datepicker = true
      this.checkDayType = 1
    },
    getDayEnd () {
      this.datepicker = true
      this.checkDayType = 2
    },
    selectDay (date) {
      if (this.checkDayType === 1) {
        this.dateBegin = `${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1}-${new Date(date).getDate()}`
        this.dateBegin = this.stringify(new Date(this.dateBegin), 'yyyy-MM-dd')
      } else if (this.checkDayType === 2) {
        this.dateEnd = `${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1}-${new Date(date).getDate()}`
      }
      if (new Date(this.dateBegin).valueOf() < new Date(parseTime(new Date())).valueOf() - 24 * 60 * 60 * 1000) {
        this.$Modal.warning({
          title: '温馨提示',
          content: '入住时间不得小于当前日期！'
        })
        this.dateBegin = this.stringify(new Date(this.currBegin), 'yyyy-MM-dd')
        this.dateEnd = this.currEnd
      } else if (new Date(this.dateBegin).valueOf() >= new Date(this.dateEnd).valueOf()) {
        this.dateEnd = parseTime(new Date(new Date(this.dateBegin).valueOf() + 24 * 60 * 60 * 1000))
      }
      this.$emit('daySelect', this.checkDayType, date)
      window.sessionStorage.setItem('dateBegin', this.dateBegin)
      window.sessionStorage.setItem('dateEnd', this.dateEnd)
      this.datepicker = false
    },
    goSeacher () {
      this.$emit('seacher')
    }
  },
  mounted () {
    this.getCalendarEvents()
    this.getAreaList()
    this.dateBegin = sessionStorage.getItem('dateBegin') ? sessionStorage.getItem('dateBegin') : this.currBegin
    this.dateEnd = sessionStorage.getItem('dateEnd') ? sessionStorage.getItem('dateEnd') : this.currEnd
    this.model1 = sessionStorage.getItem('city') ? sessionStorage.getItem('city') : '全部'
    let start = sessionStorage.getItem('dateBegin') ? sessionStorage.getItem('dateBegin') : parseTime(new Date())
    let time = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`).valueOf()
    let end = sessionStorage.getItem('dateBegin') ? sessionStorage.getItem('dateBegin') : parseTime(new Date(time + 24 * 60 * 60 * 1000))
    let key = sessionStorage.getItem('cityKey') ? sessionStorage.getItem('cityKey') : 0
    this.$emit('getCity', key)
    this.$emit('daySelect', 1, start)
    this.$emit('daySelect', 2, end)
  }
}

</script>

<style scope>
ul,li{
  list-style: none;
}
.ivu-select{
width: 120px !important;
box-shadow: 0 2px 5px 5px rgba(0,0,0,0,.2)
}
.serchBtn-app{
display: flex;
align-items: center;
justify-content: center;
width: 100vw;
}
.ivu-select-selection{
background: #fff;
height: 45px !important;
width: 120px !important;
line-height: 45px;
border:none;
}
.ivu-select-visible .ivu-select-selection{
box-shadow: 0
}
.ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
    line-height: 45px !important;
    color:#333 !important;
    font-size: 16px !important;
    text-align: center;
}
.ivu-select-dropdown{
    width: 120px !important;
    left:0;
    text-align: center;

}
.data-picker{
width:800px;
height: 45px;
background: #fff;
border-top-left-radius: 5px;
border-bottom-left-radius: 5px;
margin: 0  0 0 10px;
line-height: 45px;
text-align: center;
font-size: 16px;
box-shadow: 0 2px 5px 5px rgba(0,0,0,0,.2)
}
.data-picker span{
margin: 0 10px;
}
.serch.ivu-btn{
padding: 0 !important;
text-align: center;
line-height: 45px;
height: 45px;
width: 90px;
font-size: 16px;
border-radius: 0;
border-top-right-radius: 5px;
border-bottom-right-radius: 5px;
box-shadow: 0 2px 5px 5px rgba(0,0,0,0,.2)

}
.dataPicker{
  position: absolute;
  left:50%;
  margin-left: -380px;
  top:5px;
}
</style>
