import Vue from 'vue'
import Vuex from 'vuex'
import getNumberRange from '../utils/getNumberRange'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    apiData: [],
    logs: '',
    schedule_id: 0,

    selectedData: {},
    modal: false,
    deleteModal: false,
    editModal: false,
    showToolBar: false,
    modalLogs: false,

    /* Menu */
    groups: [],
    selectedGroup: '',
    groupModal: false,

    /* Insert e Edit */

    identificator: '',

    tarefa: {
      data: null,
      select: [
        'http GET',
        'http POST'
      ],
    },  

    nome: '',
    url: '',
    observacoes: '',
    corpo: '',

    minuto:{
      select: getNumberRange(0, 59), /* Arrey com os minutos */
      data: ''
    }, 

    hora:{
      select: getNumberRange(0, 24), /* Arrey com a horas */
      data: ''
    }, 

    dia:{
      select: getNumberRange(1, 31), /* Arrey com todos os dias de um mês */
      data: ''
    }, 

    mes:{
      select: getNumberRange(1, 12),
      data: ''
    },  

    semana:{
      select: getNumberRange(1, 6),
      data: ''
    }, 

    fullWidth: false,
    valid: true,

    successModal:{
      show: false,
      data: '',
    } ,

    errorModal: {
      show: false,
      data: '',
    },

    groupForm: {
      data: '',
      names: [],
      id: [],
    },
  },

  mutations: {
    setLogs(state, log) {
      state.logs = log
    },

    setScheduleId(state, id) {
      state.schedule_id = id
    },

    changeSuccessModal(state, data) {
      state.successModal.show = data.boolean
      state.successModal.data = `Tarefa ${data.text} | Status: ${data.status}`
      setTimeout(function() { 
        state.successModal.show = false
      }, 3000)
    },

    
    changeErrorModal(state, data) {
      state.errorModal.show = data.boolean
      state.errorModal.data = `Tarefa ${data.text} | Status: ${data.status}`
      setTimeout(function() { 
        state.errorModal.show = false
      }, 3000)
    },

    changeSelectedData(state, selectedData) {
      state.selectedData = selectedData
    },

    changeDeleteModal(state, boolean) {
      state.deleteModal = boolean
    },

    changeEditModal(state, boolean) {
      state.editModal = boolean
    },

    changeToolBar(state) {
      state.showToolBar = state.showToolBar == false ? true:false
    },

    changeModalLogs(state, boolean) {
      state.modalLogs = boolean
    },

    changeGroups(state, group) {
      state.groups.push(group)
      state.groupForm.names.push(group.name)
      state.groupForm.id.push(group.id)
    },

    changeSelectedGroup(state, group) {
      state.selectedGroup = group
    },

    changeGroupModal(state, value) {
      state.groupModal = value
    },

    changeApiData(state, data) {
      state.apiData = data
    },

    changeFullData(state, kwargs) {
      state.identificator = kwargs.id
      state.tarefa.data = state.tarefa.select[kwargs.func == 'jobs:http_get'? 0:1]
      state.nome = kwargs.name
      state.url = kwargs.args[0]
      state.observacoes = kwargs.observations
      state.corpo = kwargs.args[1]
      state.minuto.data = kwargs.minute
      state.hora.data = kwargs.hour
      state.dia.data = kwargs.day
      state.mes.data = kwargs.month
      state.semana.data = kwargs.day_of_week
    }
  },


  getters: {
    successModal: state => state.successModal,
    errorModal: state => state.errorModal,
    schedule_id: state => state.schedule_id,
    showToolBar: state => state.showToolBar,
    logs: state => state.logs,
    selectedData: state => state.selectedData,
    modal: state => state.modal,
    deleteModal: state => state.deleteModal,
    editModal: state => state.editModal,
    groups: state => state.groups,
    selectedGroup: state => state.selectedGroup,
    groupModal: state => state.groupModal,
    apiData: state => state.apiData,
    identificator: state => state.identificator,
    tarefaData: state => state.tarefa.data,
    tarefaSelect: state => state.tarefa.select,
    nome: state => state.nome,
    url: state => state.url,
    observacoes: state => state.observacoes,
    minutoData: state => state.minuto.data,
    minutoSelect: state => state.minuto.select,
    horaData: state => state.hora.data,
    horaSelect: state => state.hora.select,
    diaData: state => state.dia.data,
    diaSelect: state => state.dia.select,
    mesData: state => state.mes.data,
    mesSelect: state => state.mes.select,
    semanaData: state => state.semana.data,
    semanaSelect: state => state.semana.select,
    groupForm: state => state.groupForm
    }
})

export { store }