import Vue from 'vue'
import Vuex from 'vuex'
import card from './modules/card'
import getters from './getters'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    card
  },
  getters
})
export default store
