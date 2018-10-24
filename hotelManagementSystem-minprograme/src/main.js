import Vue from 'vue'
import App from './App'
import 'font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      'pages/logs/main',
      'pages/index/main',
      'pages/hotelAlbums/main',
      'pages/hotelDetail/main',
      'pages/introFacilities/main',
      'pages/paySuccess/main',
      'pages/orderLists/main',
      'pages/paySelect/main',
      'pages/planeOrder/main',
      'pages/datePicker/main',
      'pages/orderDetail/main',
      '^pages/register/main',
      'pages/agreement/main',
      'pages/mine/main',
      'pages/discount/main',
      'pages/commonInfo/main',
      'pages/addCommonUser/main',
      'pages/settings/main',
      'pages/orderDiscount/main',
      'pages/invoice/main',
      'pages/invoiceDetail/main',
      'pages/applyInvoice/main',
      'pages/addMailAddress/main',
      'pages/addInvoiceHeader/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'

    },
    tabBar: {
      'color': '#202020',
      'selectedColor': '#ec5045',
      'list': [{
        pagePath: 'pages/index/main',
        text: '首页',
        iconPath: '/static/img/indexlogo1.png',
        selectedIconPath: '/static/img/indexlogo2.png'
      }, {
        pagePath: 'pages/mine/main',
        text: '个人中心',
        iconPath: '/static/img/minelogo1.png',
        selectedIconPath: '/static/img/minelogo2.png'
      }]
    }
  }
}
