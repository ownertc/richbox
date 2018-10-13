<template>
  <div>
    <p class="title">{{firstMothn.currYear}}年{{firstMothn.currMoth+1}}月</p>
    <table>
      <tr><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th></tr>
      <tr v-for="(data,index) in firstMothn.currData " :key="index">
        <td v-for="(item,index1) in data" :key="index1" :class="{disabled:item.date<firstMothn.currDate||item.disabled,selected:firstMothn.currYear+'-'+(firstMothn.currMoth+1)+'-'+item.date==selectedDate}" >
          <span @click="setData(firstMothn.currYear,(firstMothn.currMoth+1),item.date)">{{item.date}}</span>
         <!--  <span v-if="item.date>=firstMothn.currDate&&!item.disabled" >￥{{item.price}}</span> -->
        </td>    
      </tr>
    </table>
     <p class="title">{{secondMothn.currYear}}年{{secondMothn.currMoth+1}}月</p>
    <table>
      <tr><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th></tr>
      <tr v-for="(data,index) in secondMothn.currData " :key="index">
        <td v-for="(item,index1) in data" :key="index1">  
            <span  @click="setData(secondMothn.currYear,(secondMothn.currMoth+1),item.date)">{{item.date}}</span>
        <!--     <span v-if="item.date">￥{{item.price}}</span> -->
          </td>
      </tr>
    </table>
    <p class="title">{{thirdMothn.currYear}}年{{thirdMothn.currMoth+1}}月</p>
    <table>
      <tr><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th></tr>
      <tr v-for="(data,index) in thirdMothn.currData " :key="index">
        <td v-for="(item,index1) in data" :key="index1">
          <span @click="setData(thirdMothn.currYear,(thirdMothn.currMoth+1),item.date)">{{item.date}}</span>
          <!--  <span v-if="item.date" >￥{{item.price}}</span> -->
           </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {GetHotelCalendarList} from '@/utils/api'
export default {
  data () {
    return {
      priceList: [],
      weeks: [0, 1, 2, 3, 4, 5],
      selectedDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
      firstMothn: {
        mDays: [],
        n1str: -1, // 当月第一天是星期几
        tr_str: 0, // 本月共有几个星期
        currYear: new Date().getFullYear(), // 当月年份
        currMoth: new Date().getMonth(), // 当月月份
        currDate: new Date().getDate(), // 当月日期
        currDays: 0, // 单月总天数
        currData: [],
        prevMothDays: 0

      },
      secondMothn: {
        mDays: [],
        n1str: -1, // 当月第一天是星期几
        tr_str: 0, // 本月共有几个星期
        currYear: 0, // 当月年份
        currMoth: 0, // 当月月份
        currDate: 0, // 当月日期
        currDays: 0, // 单月总天数
        currData: [],
        prevMothDays: 0
      },
      thirdMothn: {
        mDays: [],
        n1str: -1, // 当月第一天是星期几
        tr_str: 0, // 本月共有几个星期
        currYear: 0, // 当月年份
        currMoth: 0, // 当月月份
        currDate: 0, // 当月日期
        currDays: 0, // 单月总天数
        currData: [],
        prevMothDays: 0
      }
    }
  },
  props: ['dateBegin', 'dateEnd', 'hotelId'],
  methods: {
    setData (year, moth, date) {
      wx.navigateTo({ url: `../../pages/hotelDetail/main?hotelId=${this.hotelId}&dateType=${this.dateType}&date=${year}-${moth}-${date}` })
    },
    isLeap (year) {
      let res = (year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : (year % 4 === 0 ? 1 : 0))
      return res
    },
    setSelectDate (date) {
      this.setSelectDate = date
    },
    getPriceList () {
      GetHotelCalendarList({hotelId: this.hotelId}).then(res => {
        let data = res.Data
        data.forEach(item => {
          item.DateIndex = `${new Date(item.DateIndex).getFullYear()}${new Date(item.DateIndex).getMonth() + 1}${new Date(item.DateIndex).getDate()}`
        })
        this.priceList = data
        this.initFirstMothn()
        this.initSecondMothn()
        this.initTridondMothn()
      })
    },
    getCurrData (trStr, firstday, totalDays) {
      this.firstMothn.currData = []
      for (let i = 0; i < trStr; i++) { // 表格的行
        this.firstMothn.currData.push([])
        for (let k = 0; k < 7; k++) { // 表格每行的单元格
          let idx = i * 7 + k // 单元格自然序列号
          let dateStr = {date: (idx - firstday + 2), disabled: false} // 计算日期
          if (dateStr.date <= 0) {
            dateStr.date = this.firstMothn.prevMothDays + dateStr.date
            dateStr.disabled = true
          } else if (dateStr.date > totalDays) {
            dateStr.date = ''
            dateStr.disabled = true
          }
          dateStr.value = `${this.firstMothn.currYear}${this.firstMothn.currMoth + 1}${dateStr.date}`

          this.priceList.forEach(item => {
            if (item.DateIndex === dateStr.value) {
              dateStr.price = item.Price
              dateStr.isFull = item.IsFull
            }
          })
          this.firstMothn.currData[i].push(dateStr)
        }
      }
    },
    getSecCurrData (trStr, firstday, totalDays) {
      this.secondMothn.currData = []
      for (let i = 0; i < trStr; i++) { // 表格的行
        this.secondMothn.currData.push([])
        for (let k = 0; k < 7; k++) { // 表格每行的单元格
          let idx = i * 7 + k // 单元格自然序列号
          let dateStr = {date: (idx - firstday + 2), disabled: false} // 计算日期
          if (dateStr.date <= 0) {
            dateStr.date = ''
          } else if (dateStr.date > totalDays) {
            dateStr.date = ''
          }
          dateStr.value = `${this.secondMothn.currYear}${this.secondMothn.currMoth + 1}${dateStr.date}`
          this.priceList.forEach(item => {
            if (item.DateIndex === dateStr.value) {
              dateStr.price = item.Price
              dateStr.isFull = item.IsFull
            }
          })
          this.secondMothn.currData[i].push(dateStr)
        }
      }
    },
    getThirdCurrData (trStr, firstday, totalDays) {
      this.thirdMothn.currData = []
      for (let i = 0; i < trStr; i++) { // 表格的行
        this.thirdMothn.currData.push([])
        for (let k = 0; k < 7; k++) { // 表格每行的单元格
          let idx = i * 7 + k // 单元格自然序列号
          let dateStr = {date: (idx - firstday + 2), disabled: false} // 计算日期
          if (dateStr.date <= 0) {
            dateStr.date = ''
          } else if (dateStr.date > totalDays) {
            dateStr.date = ''
          }
          dateStr.value = `${this.thirdMothn.currYear}${this.thirdMothn.currMoth + 1}${dateStr.date}`
          this.priceList.forEach(item => {
            if (item.DateIndex === dateStr.value) {
              dateStr.price = item.Price
              dateStr.isFull = item.IsFull
            }
          })
          this.thirdMothn.currData[i].push(dateStr)
        }
      }
    },
    initFirstMothn () {
      this.firstMothn.mDays = [31, 28 + this.isLeap(this.firstMothn.currYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      this.firstMothn.currDays = this.firstMothn.mDays[this.firstMothn.currMoth]
      this.firstMothn.n1str = new Date(this.firstMothn.currYear, this.firstMothn.currMoth, 1).getDay()
      this.firstMothn.tr_str = Math.ceil((this.firstMothn.currDays + this.firstMothn.n1str) / 7)
      this.firstMothn.prevMothDays = this.firstMothn.currMoth === 0 ? 31 : this.firstMothn.mDays[this.firstMothn.currMoth - 1]
      this.getCurrData(this.firstMothn.tr_str, this.firstMothn.n1str, this.firstMothn.currDays)
    },
    initSecondMothn () {
      this.secondMothn.currYear = this.firstMothn.currMoth === 11 ? (this.firstMothn.currYear + 1) : this.firstMothn.currYear
      this.secondMothn.currMoth = this.firstMothn.currMoth === 11 ? 0 : this.firstMothn.currMoth + 1
      this.secondMothn.currDate = 1
      this.secondMothn.mDays = [31, 28 + this.isLeap(this.secondMothn.currYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      this.secondMothn.currDays = this.secondMothn.mDays[this.secondMothn.currMoth]
      this.secondMothn.n1str = new Date(this.secondMothn.currYear, this.secondMothn.currMoth, 1).getDay()
      this.secondMothn.tr_str = Math.ceil((this.secondMothn.currDays + this.secondMothn.n1str) / 7)
      this.getSecCurrData(this.secondMothn.tr_str, this.secondMothn.n1str, this.secondMothn.currDays)
    },
    initTridondMothn () {
      this.thirdMothn.currYear = this.secondMothn.currMoth === 11 ? (this.secondMothn.currYear + 1) : this.secondMothn.currYear
      this.thirdMothn.currMoth = this.secondMothn.currMoth === 11 ? 0 : this.secondMothn.currMoth + 1
      this.thirdMothn.currDate = 1
      this.thirdMothn.mDays = [31, 28 + this.isLeap(this.thirdMothn.currYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      this.thirdMothn.currDays = this.thirdMothn.mDays[this.thirdMothn.currMoth]
      this.thirdMothn.n1str = new Date(this.thirdMothn.currYear, this.thirdMothn.currMoth, 1).getDay()
      this.thirdMothn.tr_str = Math.ceil((this.thirdMothn.currDays + this.thirdMothn.n1str) / 7)
      this.getThirdCurrData(this.thirdMothn.tr_str, this.thirdMothn.n1str, this.thirdMothn.currDays)
    }
  },

  mounted () {
    this.getPriceList()
  }
}
</script>

<style>  
.title{
  font-size: 34rpx;
  margin-left: 30rpx;
}
tr{
  width: 100vw;
  display: flex;
  margin: 20rpx 0;
}
table{
  margin-bottom: 100rpx;
}
th{
  flex:1;
  text-align: center;
  font-size: 28rpx;
}
td{
  flex: 1;
  font-size: 26rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80rpx;
  color:#333;
}
td.disabled{
  color:#999;
}
td.selected{
  background: #ff2d50;
  color:#fff;
  width: 80%;
  height: 80%;
  border-radius: 5rpx;
}

</style>
