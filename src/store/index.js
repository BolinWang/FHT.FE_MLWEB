import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cityId: '330100',
    typeIndex: 0,
    regionIndex: 0,
    rentalIndex: 5,
    chamberIndex: 0,
    areaIndex: 0,
    decorationIndex: 0
  },
  mutations: {
    changefilter (state, payload) {
      state[payload.item] = payload.index
    }
  },
  getters
})

export default store
