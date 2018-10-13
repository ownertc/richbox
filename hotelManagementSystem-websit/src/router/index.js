import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import inteexplan from '@/views/inteexplan'
import hotelDetail from '@/views/hotelDetail'
import forgetPassword from '@/views/forgetPassword'
import subscribInfo from '@/views/subscribInfo'
import login from '@/views/login'
import register from '@/views/register'
import payWaySelect from '@/views/payWaySelect'
import paycode from '@/views/paycode'
import paySuccess from '@/views/paySuccess'
import list from '@/views/list'
import memberCenter from '@/views/memberCenter'
import memberIndex from '@/views/memeberInex'
import center from '@/views/center'
import order from '@/views/order'
import usalInfo from '@/views/usalnfo'
import voucher from '@/views/voucher'
import orderDetail from '@/views/orderDetail'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/inteexplan',
      name: 'inteexplan',
      component: inteexplan
    },
    {
      path: '/detail',
      name: 'detail',
      component: hotelDetail
    },
    {
      path: '/findPassword',
      name: 'findPassword',
      component: forgetPassword
    },
    {
      path: '/subscribInfo',
      name: 'subscribInfo',
      component: subscribInfo
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/payWay',
      name: 'payWay',
      component: payWaySelect
    },
    {
      path: '/paycode',
      name: 'paycode',
      component: paycode
    },
    {
      path: '/paySuccess',
      name: 'paySuccess',
      component: paySuccess
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/member',
      component: memberCenter,
      redirect: '/member/index',
      children: [
        {
          path: 'index',
          component: memberIndex
        },
        {
          path: 'center',
          name: 'center',
          component: center
        },
        {
          path: 'order',
          name: 'order',
          component: order
        },
        {
          path: 'usalInfo',
          name: 'usalInfo',
          component: usalInfo
        },
        {
          path: 'voucher',
          name: 'voucher',
          component: voucher
        }

      ]
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: orderDetail
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }

})

export default router
