<template>
  <div class="">
    <div class="datePickerContainer">
      <el-input  prefix-icon="el-icon-date" v-model="chooseedDay" size="mini" v-popover:dateList placeholder="请选择日期">
      <!--<i @click.native=" chooseedDay = ''" slot="suffix" class="el-input__icon el-icon-circle-close-outline"></i> -->
      </el-input>
      <el-popover v-loading="loadingPopDataList" popper-class="popover" width="546" ref="dateList" placement="bottom-start" trigger="click" :open-delay="300" @show="whenPopoverShow" v-model="showPop">
        <el-container class="container">
          <el-header class="header">
            <el-row>
              <el-col @click.native="returnToday" class="returnToday" style="width: 100px;cursor:pointer;">回到今天</el-col>
              <el-col style="width: 60px;">日</el-col>
              <el-col style="width: 60px;">一</el-col>
              <el-col style="width: 60px;">二</el-col>
              <el-col style="width: 60px;">三</el-col>
              <el-col style="width: 60px;">四</el-col>
              <el-col style="width: 60px;">五</el-col>
              <el-col style="width: 60px;">六</el-col>
            </el-row>
          </el-header>

          <el-container>
            <el-aside class="aside" width="100px">
              <el-row class="flex-align-center">
                <el-col :span="24"><img @click="getLastMonth" :src="topArrow" alt=""></el-col>
              </el-row>
              <el-row class="flex-align-center">
                <el-col :span="24"><span>{{dateObj.thisYear + '年' + dateObj.thisMonth + '月'}}</span></el-col>
              </el-row>
              <el-row class="flex-align-center">
                <el-col :span="24"><img  @click="getNextMonth" :src="bottomArrow" alt=""></el-col>
              </el-row>
            </el-aside>

            <el-main class="main">
              <el-row>
                <el-col v-if="pioneerDateSequenceInWeek > 0" class="whenHover" style="width: 60px"></el-col>
                <el-col v-if="pioneerDateSequenceInWeek > 1" class="whenHover" style="width: 60px"></el-col>
                <el-col v-if="pioneerDateSequenceInWeek > 2" class="whenHover" style="width: 60px"></el-col>
                <el-col v-if="pioneerDateSequenceInWeek > 3" class="whenHover" style="width: 60px"></el-col>
                <el-col v-if="pioneerDateSequenceInWeek > 4" class="whenHover" style="width: 60px"></el-col>
                <el-col v-if="pioneerDateSequenceInWeek > 5" class="whenHover" style="width: 60px"></el-col>

                <el-col :class="{ activeColor: day.day == dateObj.thisDate ? true :false }" @click.native="pickThisDay(day, index)" :key="index" v-for="(day, index) in data" style="width: 60px;">
                  <span>{{day.day}}</span>
                  <span>￥{{day.price}}</span>
                </el-col>

                <!--<el-col v-if="remainder > 0" class="whenHover" style="width: 60px"></el-col>-->
                <!--<el-col v-if="remainder > 1"class="whenHover" style="width: 60px"></el-col>-->
                <!--<el-col v-if="remainder > 2"class="whenHover" style="width: 60px"></el-col>-->
                <!--<el-col v-if="remainder > 3"class="whenHover" style="width: 60px"></el-col>-->
                <!--<el-col v-if="remainder > 4"class="whenHover" style="width: 60px"></el-col>-->
              </el-row>
            </el-main>
          </el-container>

        </el-container>
      </el-popover>
    </div>

  </div>
</template>

<script>
import topArrow from '@/assets/images/top_arrow.svg'
import bottomArrow from '@/assets/images/bottom-arrow.svg'
export default {
  name: 'canleandar',
  components: {},
  mounted () {
    //
  },
  data () {
    return {
      topArrow,
      bottomArrow,
      remainder: '', // 尾部空格数
      dateCountsInMonth: '',
      pioneerDateSequenceInWeek: '', // 头部空格数
      chooseedDay: '',
      loadingPopDataList: false,
      showToolTip: false,
      showPop: false,
      loadingPopData: false,
      hotelId: null, // 酒店ID
      data: [
        {
          'day': '1',
          'price': '158'
        },
        {
          'day': '2',
          'price': '158'
        },
        {
          'day': '3',
          'price': '159'
        },

        {
          'day': '4',
          'price': '158'
        },
        {
          'day': '5',
          'price': '158'
        },
        {
          'day': '6',
          'price': '158'
        },
        {
          'day': '7',
          'price': '158'
        },
        {
          'day': '8',
          'price': '158'
        },
        {
          'day': '9',
          'price': '158'
        },
        {
          'day': '10',
          'price': '158'
        },
        {
          'day': '11',
          'price': '59'
        },
        {
          'day': '12',
          'price': '59'
        },
        {
          'day': '13',
          'price': '59'
        },
        {
          'day': '14',
          'price': '59'
        },
        {
          'day': '15',
          'price': '59'
        },
        {
          'day': '16',
          'price': '59'
        },
        {
          'day': '17',
          'price': '59'
        },
        {
          'day': '18',
          'price': '59'
        },
        {
          'day': '19',
          'price': '59'
        }, {
          'day': '20',
          'price': '59'
        },
        {
          'day': '21',
          'price': '59'
        }, {
          'day': '22',
          'price': '59'
        }, {
          'day': '23',
          'price': '59'
        }, {
          'day': '24',
          'price': '59'
        },
        {
          'day': '25',
          'price': '59'
        },
        {
          'day': '26',
          'price': '59'
        },
        {
          'day': '27',
          'price': '59'
        },
        {
          'day': '28',
          'price': '59'
        },
        {
          'day': '29',
          'price': '59'
        }, {
          'day': '30',
          'price': '59'
        }, {
          'day': '31',
          'price': '59'
        }
      ],
      emptyData: [
        { id: 'mon' }, { id: 'tue' }, { id: 'wed' },
        { id: 'thi' }, { id: 'fri' }, { id: 'sta' }
      ],
      dateObj: { date: new Date(), thisYear: -1, thisMonth: -1, thisWeek: -1, thisDate: '', priceArr: [] }
    }
  },
  methods: {
    pickThisDay (date, index) {
      this.chooseedDay = date.day
    },
    returnToday () {
      this.dateObj.thisYear = this.dateObj.date.getFullYear()
      this.dateObj.thisMonth = this.dateObj.date.getMonth() + 1
      this.dateObj.thisWeek = this.dateObj.date.getDay()
      this.dateObj.thisDate = this.dateObj.date.getDate()
      this.getMonthDayCounts(this.dateObj.thisYear, this.dateObj.thisMonth)
      this.getSequenceInWeek(this.dateObj.thisYear, this.dateObj.thisMonth)
      // console.log(this.dateObj.thisDate)
    },
    whenPopoverShow () {
      this.returnToday()
      this.showToolTip = false
    },
    getLastMonth () {
      let newMonth = this.dateObj.thisMonth
      let newYear = this.dateObj.thisYear
      if (newMonth <= 1) {
        newYear -= 1
        newMonth = 12
        this.dateObj.thisYear = newYear
        this.dateObj.thisMonth = newMonth
        this.getSequenceInWeek(newYear, newMonth)
        this.getMonthDayCounts(this.dateObj.thisYear, this.dateObj.thisMonth)
        this.restEmpty(this.dateCountsInMonth, this.pioneerDateSequenceInWeek)
      } else {
        newMonth -= 1
        this.dateObj.thisMonth = newMonth
        this.getSequenceInWeek(newYear, newMonth)
        this.getMonthDayCounts(this.dateObj.thisYear, this.dateObj.thisMonth)
        this.restEmpty(this.dateCountsInMonth, this.pioneerDateSequenceInWeek)
      }
    },
    getNextMonth () {
      let newMonth = this.dateObj.thisMonth
      let newYear = this.dateObj.thisYear
      if (newMonth >= 12) {
        newYear += 1
        newMonth = 1
        this.dateObj.thisYear = newYear
        this.dateObj.thisMonth = newMonth
        this.getSequenceInWeek(newYear, newMonth)
        this.getMonthDayCounts(this.dateObj.thisYear, this.dateObj.thisMonth)
        this.restEmpty(this.dateCountsInMonth, this.pioneerDateSequenceInWeek)
      } else {
        newMonth += 1
        this.dateObj.thisMonth = newMonth
        this.getSequenceInWeek(newYear, newMonth)
        this.restEmpty(this.dateCountsInMonth, this.pioneerDateSequenceInWeek)
        this.getMonthDayCounts(this.dateObj.thisYear, this.dateObj.thisMonth)
      }
    },
    // 得到一个月的天数
    getMonthDayCounts (year, month) {
      const dateCounts = new Date(year, month, 0).getDate()
      this.dateCountsInMonth = dateCounts
      return dateCounts // 获取当月最后一天日期
    },
    // 得到每月的一号是周几
    getSequenceInWeek (year, month) {
      const date = new Date(year, month - 1, 1)
      const weekday = date.getDay()
      this.pioneerDateSequenceInWeek = weekday
      // console.log(weekday)
      return weekday
    },
    restEmpty (conts, weekyNum) {
      const totalCell = conts + weekyNum
      this.remainder = totalCell % 7
      // console.log(conts)
      // console.log(weekyNum)
      console.log(this.remainder)
    },
    setEmptyDataLen (index) {
      switch (index) {
        case 0:
          console.log(index)
          this.emptyData = []
          break
        case 1:
          this.emptyData = this.emptyData.slice(0, 1)
          break
        case 2:
          this.emptyData = this.emptyData.slice(0, 2)
          break
        case 3:
          this.emptyData = this.emptyData.slice(0, 3)
          break
        case 4:
          this.emptyData = this.emptyData.slice(0, 4)
          break
        case 5:
          this.emptyData = this.emptyData.slice(0, 5)
          break
        case 6:
          this.emptyData = this.emptyData.slice(0, 6)
          break
      }
    }
  }
}
</script>
<style scoped>
  .datePickerContainer {
    text-align: left;
    margin-top: 50px;
  }

  .datePickerContainer .el-input {
    width: 200px;
  }

  .returnToday:hover {
    color: #333;
  }
  .hasborder{
    border-right: 1px solid #e8e8e8;
  }
  .container .header {
    background: #3296fa;
    color: #ffffff;
    height: 30px !important;
    line-height: 30px;
    padding: 0;
  }

  .container .header .el-row {
    width: 100%;
    height: 100%;
  }

  .container .header .el-row .el-col {
    text-align: center;
    height: 100%;
  }

  .main {
    padding: 0 !important;
    width: 420px !important;
  }

  .main .el-col span {
    display: block;
    line-height: 20px;
    text-align: center;
  }

  .main .el-col {
    min-height: 40px;
    border-right: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
    cursor: pointer;
  }
  .main .whenHover:hover{
    background: #fff!important;
  }
  .main .el-col:hover{
    background: #3296fa;
    color: #fff;
  }
  .main .activeColor{
    background: #3296fa!important;
    color: #ffffff!important;
  }
  .aside {
    min-height: 205px;
    text-align: center;
    border: 1px solid #e8e8e8;
  }
  .aside img {
    cursor: pointer;
    width: 50px;
    height: 40px;
  }
  .aside .el-row {
    height: 33%;
  }

</style>
