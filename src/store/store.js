import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    selectedData: {},
    modal: false,
    deleteModal:false,
    deleteId: 0,
  },

  mutations: {
    changeSelectedData(state, selectedData) {
      state.selectedData = selectedData
    },
    changeModal(state) {
      state.modal = state.modal == false ? true : false
    },
    changeDeleteModal(state, id) {
      state.deleteModal = state.deleteModal == false ? true : false
      state.deleteId = id
    },
  },

  getters: {
    selectedData: state => state.selectedData,
    modal: state => state.modal,
    deleteModal: state => state.deleteModal,
    deleteId: state => state.deleteId,
  }
})

export { store }