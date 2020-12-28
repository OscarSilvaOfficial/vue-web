import Vue from 'vue'
import Vuex from 'vuex'
import replaceData from '../utils/replaceData'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    selectedData: {
      id: 0,
    },
    click: false,
  },

  mutations: {
    changeSelectedData(state, selectedData) {
      state.selectedData = selectedData
    },
    changeModal(state) {
      state.click = state.click == false ? true : false
    },
  },

  getters: {
    selectedData: state => state.selectedData,
    click: state => state.click,
  }
})

export { store }