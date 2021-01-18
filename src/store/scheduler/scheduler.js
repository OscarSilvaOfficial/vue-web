import { getNumberRange } from '../../utils/format'

export default {
  state: {
    apiData: [],

    identificator: '',

    checkbox: false,
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
  },
  getters: {
    checkbox: state => state.checkbox,
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
    corpo: state => state.corpo,
    diaSelect: state => state.dia.select,
    mesData: state => state.mes.data,
    mesSelect: state => state.mes.select,
    semanaData: state => state.semana.data,
    semanaSelect: state => state.semana.select,
  },
  mutations: {
    changeCheckBox(state, boolean) {
      state.checkbox = boolean
    },

    setApiData(state, data) {
      state.apiData = data
    },

    changeApiData(state, data) {
      state.apiData.push(data)
    },

    refactorApiData(state, payload) {
      state.apiData.map((data, i) => {
        if (data.id == payload.id) {
          state.apiData.splice(i, 1)
          state.apiData.push(payload)
        }
      })
    },

    removeApiData(state, id) {
      state.apiData.map((data, i) => {
        if (data.id == id) {
          state.apiData.splice(i, 1)
        }
      })
    },

    setId: function(state, id) {
      state.identificator = id
    },

    setFunc: function(state, func) {
      state.tarefa.data = state.tarefa.select[func == 'http GET'? 0:1]
    },

    setName: function(state, name) {
      state.nome = name
    },

    setUrl: function(state, url) {
      state.url = url
    },

    setObservation: function(state, obs) {
      state.observacoes = obs
    },

    setBody: function(state, bady) {
      state.corpo = bady
    },

    setMinute: function(state, minute) {
      state.minuto.data = minute
    },

    setHour: function(state, hour) {
      state.hora.data = hour
    },

    setDay: function(state, day) {
      state.dia.data = day
    },

    setMonth: function(state, month) {
      state.mes.data = month
    },

    setWeek: function(state, week) {
      state.semana.data = week
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
  }
}