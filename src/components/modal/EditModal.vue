<template>
  <v-row class="modal-scheduler">
    <v-dialog
      v-model="$store.state.click"
      hide-overlay
      transition="slide-x-reverse-transition"
      max-width="50%"
    >
      <v-card height="100%">
        <v-toolbar dark color="teal">
          <v-btn icon dark @click="closeModal()" >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn 
            dark 
            text 
            v-if="data.args[1]"
            @click="postForm(
              [data.id, tarefa.select[data.func == 'jobs:http_get' ? 0 : 1], 
               nome, [data.args[0], data.args[1]], data.observation,
               data.minute, data.hour, data.day, data.month, data.day_of_week]
            )">Criar </v-btn>
            <v-btn 
            dark 
            text 
            v-else
            @click="postForm(
              [data.id, tarefa.select[data.func == 'jobs:http_get' ? 0 : 1], 
               nome, [data.args[0]], data.observation,
               data.minute, data.hour, data.day, data.month, data.day_of_week]
            )">Criar </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          class="form"
        >
          <v-select
            :value="tarefa.select[data.func == 'jobs:http_get' ? 0 : 1]"
            :items="tarefa.select"
            label="Tarefa"
            required
            class="input-tarefa"
          ></v-select>

          <v-text-field
            :value="data.name"
            @mouseout="setName"
            @mouseover="setName"
            label="Nome da Tarefa"
            required
            class="input"
          ></v-text-field>

          <v-text-field
            :value="data.args[0]"
            label="Recurso/URL"
            required
            class="input"
          ></v-text-field>

          <v-text-field
            :value="data.observation"
            label="Observações"
            required
            class="input"
          ></v-text-field>

          <v-text-field
            :value="data.args[1]"
            label="Corpo da Requisição"
            required
            class="input"
            v-if="tarefa.data == 'jobs:http_post' || tarefa.data == 'http POST'"
          ></v-text-field>

          <v-select
            class="mini-input"
            :value="minuto.select[selectArray(minuto.select, data.minute)]"
            :items="minuto.select"
            label="Min"
            required
          ></v-select>

          <v-select
            class="mini-input"
            :value="hora.select[selectArray(hora.select, data.hour)]"
            :items="hora.select"
            label="Hora"
            required
          ></v-select>

          <v-select
            class="mini-input"
            :value="dia.select[selectArray(dia.select, data.day)]"
            :items="dia.select"
            label="Dia"
            required
          ></v-select>

          <v-select
            class="mini-input"
            :value="mes.select[selectArray(mes.select, data.month)]"
            :items="mes.select"
            label="Mês"
            required
          ></v-select>

          <v-select
            :value="semana.select[selectArray(semana.select, data.day_of_week)]"
            :items="semana.select"
            label="Semana"
            required
            class="input"
          ></v-select>

        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import getNumberRange from '../../utils/getNumberRange'
import { patchJob } from '../../services/endpoits'
import { formatHttpMethod } from '../../utils/format.js'

export default {
  props: {
    data: '',
  },
  data() {
    return {
      title: 'Edição da Tarefa',
      notifications: false,
      sound: true,
      widgets: false,
      btnIcon: "mdi-plus",

      nome: '',

      tarefa: {
        data: '',
        select: [
          'http GET',
          'http POST'
        ],
      },  

      minuto:{
        select: getNumberRange(0, 59), /* Arrey com os minutos */
        data: ''
      }, 

      hora:{
        select: getNumberRange(0, 23), /* Arrey com a horas */
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
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    closeModal() {
      this.$store.commit('changeModal')
    },
    setName: function(event) {
      this.nome = event.target.value
    },
    setFunc: function() {
      return this.tarefa.select[this.data.func == 'jobs:http_get' ? 0 : 1]
    },
    selectArray(array, data) {
      for (let result of array) {
        if (result == data) {
          return result
        }
      }
    },
    postForm(job) {
      const urls = []
      for(let i of job[3]){
        urls.push(i)
      } 

      const payload = {
        args: urls,
        day: job[7],
        day_of_week: job[9],
        func: formatHttpMethod(job[1]),
        hour: job[6],
        id: job[0],
        kwargs: {
          headers: {}
        },
        minute: job[5],
        month: job[8].toString(),
        name: job[2],
        observation: job[4],
        trigger: 'cron',
      } 
      console.log(payload)
      patchJob(payload)
        .then((result) => {
          alert(result.data.id)
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
};
</script>


