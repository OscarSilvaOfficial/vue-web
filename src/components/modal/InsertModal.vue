<template>
  <v-row class="modal-scheduler">
    <v-dialog
      v-model="dialog"
      hide-overlay
      transition="slide-x-reverse-transition"
      max-width="50%"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-2 btn-add"
          fab
          dark
          color="teal"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon dark>
            {{ btnIcon }}
          </v-icon>
        </v-btn>
      </template>
      <v-card height="100%">
        <v-toolbar dark color="teal">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn 
            dark 
            text 
            v-if="corpo"
            @click="postForm(
              [identificator, tarefa.data, nome, [url, corpo], observacoes,
               minuto.data, hora.data, dia.data, mes.data, semana.data]
            )">Criar </v-btn>
            <v-btn 
            dark 
            text 
            v-else
            @click="postForm(
              [identificator, tarefa.data, nome, [url], observacoes,
               minuto.data, hora.data, dia.data, mes.data, semana.data]
            )">Criar </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          class="form"
        >
          <v-text-field
            v-model="identificator"
            label="Identificador"
            required
            class="mini-input"
          ></v-text-field>

          <v-select
            v-model="tarefa.data"
            :items="tarefa.select"
            label="Tarefa"
            required
            class="mini-input"
          ></v-select>

          <v-text-field
            v-model="nome"
            label="Nome da Tarefa"
            required
            class="input"
          ></v-text-field>

          <v-text-field
            v-model="url"
            label="Recurso/URL"
            required
            class="input"
          ></v-text-field>

          <v-text-field
            v-model="observacoes"
            label="Observações"
            required
            class="input"
          ></v-text-field>

          <v-text-field
            v-model="corpo"
            label="Corpo da Requisição"
            required
            class="input"
            v-if="tarefa.data == 'http POST'"
          ></v-text-field>

          <v-select
            class="mini-input"
            v-model="minuto.data"
            :items="minuto.select"
            label="Min"
            required
          ></v-select>

          <v-select
            class="mini-input"
            v-model="hora.data"
            :items="hora.select"
            label="Hora"
            required
          ></v-select>

          <v-select
            class="mini-input"
            v-model="dia.data"
            :items="dia.select"
            label="Dia"
            required
          ></v-select>

          <v-select
            class="mini-input"
            v-model="mes.data"
            :items="Object.values(mes.select)"
            label="Mês"
            required
          ></v-select>

          <v-select
            v-model="semana.data"
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
import { postJob } from '../../services/endpoits'
import { formatHttpMethod } from '../../utils/format.js'

export default {
  data() {
    return {
      title: 'Criação de Tarefa',
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      btnIcon: "mdi-plus",

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
        select: {
          Janeiro: 1,
          Fevereiro: 2,
          Marco: 3,
          Abril: 4,
          Maio: 5,
          Junho: 6, 
          Julho: 7,
          Agosto: 8,
          Setembro: 9, 
          Outubro: 10,
          Novembro: 11,
          Dezembro: 12  
        },
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
    validate () {
      this.$refs.form.validate()
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
      postJob(payload)
        .then((result) => {
          alert(`Tarefa com o ID ${result.data.id} inserido`)
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
};
</script>

<style>
.btn-add {
  position: fixed;
  bottom: 2%;
  right: 1%;
}

.modal-scheduler {
  margin-left: 100rem;
}

.form {
  width: 90%;
  margin: 1% auto auto auto;
}

.input {
  padding: 1%;
}

.mini-input {
  width: 50%;
  padding: 1%;
  display: inline-block;
  position: relative;
}
</style>
