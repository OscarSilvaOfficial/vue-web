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
    headers: '',
    minuto:'',
    hora:'',
    dia: '',
    mes:'',
    semana: '',
    accept_logs: '',

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
    minutoData: state => state.minuto,
    horaData: state => state.hora,
    diaData: state => state.dia,
    corpo: state => state.corpo,
    headers: state => state.headers,
    accept_logs: state => state.accept_logs,
    mesData: state => state.mes,
    semanaData: state => state.semana,
  },
  mutations: {
    changeAcceptLogs(state, boolean) {
      state.accept_logs = boolean == true ? 1:0
    },

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

    setHeader: function(state, header) {
      state.headers = header
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
      state.minuto = minute
    },

    setHour: function(state, hour) {
      state.hora = hour
    },

    setDay: function(state, day) {
      state.dia = day
    },

    setMonth: function(state, month) {
      state.mes = month
    },

    setWeek: function(state, week) {
      state.semana = week
    },

    changeFullData(state, kwargs) {
      state.identificator = kwargs.id
      state.tarefa.data = state.tarefa.select[kwargs.func == 'jobs:http_get'? 0:1]
      state.nome = kwargs.name
      state.url = kwargs.args[0]
      state.observacoes = kwargs.observation
      state.headers = kwargs.kwargs.headers
      state.corpo = kwargs.args[1]
      state.minuto = kwargs.minute
      state.hora = kwargs.hour
      state.dia = kwargs.day
      state.mes = kwargs.month
      state.semana = kwargs.day_of_week
      state.accept_logs = kwargs.accept_logs
    }
  }
}