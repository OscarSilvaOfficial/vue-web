import Vue from 'vue'
import Vuex from 'vuex'
import scheduler from './scheduler/scheduler'
import modais from './modais/modais'
import group from './group/group'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    scheduler,
    modais,
    group,
  },

  state: {
    logs: '',
    schedule_id: 0,
    selectedGroup: '',
  },

  mutations: {
    setLogs(state, log) {
      state.logs = log
    },

    setScheduleId(state, id) {
      state.schedule_id = id
    },

    changeSelectedGroup(state, group) {
      state.selectedGroup = group
    },
  },

  getters: {
    schedule_id: state => state.schedule_id,
    logs: state => state.logs,
    selectedGroup: state => state.selectedGroup,
  }
})

export { store }