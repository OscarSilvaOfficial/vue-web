<template>
  
  <v-card
    color="grey lighten-4"
    flat
    tile
    v-show="$store.getters.showToolBar"
    transition="slide-x-reverse-transition"
  >
    <LogsScheduler />
    <v-toolbar dense>

      <v-btn
        depressed
        color="error"
        @click="run()"
      >
        <v-icon left dark>
          mdi-arrow-right-drop-circle
        </v-icon>
        EXECUTAR
      </v-btn>

      <v-btn
        depressed
        @click="pause()"
        class="toolbar-btn"
      >
        <v-icon left dark>
          mdi-pause
        </v-icon>
        PAUSAR
      </v-btn>

      <v-btn
        depressed
        color="primary"
        @click="resume()"
        class="toolbar-btn"
      >
        <v-icon left dark>
          mdi-restart
        </v-icon>
        ATIVAR
      </v-btn>


    <v-btn
      color="blue-grey"
      @click="logs()"
      class="white--text toolbar-btn"
      v-show="accept_logs"
    >
      <v-icon left dark>
          mdi-information
      </v-icon>
      LOGS
    </v-btn>

    </v-toolbar>
  </v-card>
</template>
<script>
import { runJob, resumeJob, pauseJob, postLog } from '../../services/endpoits'
import LogsScheduler from '../modal/LogsScheduler'
import { dateToString } from '../../utils/format.js'


export default {
  props: ['id', 'accept_logs'],

  components: {
    LogsScheduler
  },

  methods: {
    run: function() {
      runJob(this.id)
      .then(result => {
        this.$store.commit('changeSuccessModal', {
          text: 'enviada para execução',
          status: result.status,
          boolean: true
        })
        const payload = {
          schedule_id: this.id,
          log: `Tarefa com o id ${this.id} foi enviada para execução.`
        }
        postLog(payload)

        let data = result.data

        /* Altera os dados da tabela em tempo real */
        data.next_run_time = dateToString(data.next_run_time)
        data.last_run_time = dateToString(data.last_run_time)
        this.$store.commit('refactorApiData', data)
        this.$store.commit('changeCheckBox', true)
      })
      .catch(error => {
        this.$store.commit('changeErrorModal', {
          text: 'não executada',
          status: error,
          boolean: true
        })
        const payload = {
          schedule_id: this.id,
          log: `Tarefa com o id ${this.id} não foi executada.`
        }
        postLog(payload)
      }) 
    },

    resume: function() {
      resumeJob(this.id)
      .then(result => {
        this.$store.commit('changeSuccessModal', {
          text: 'ativada',
          status: result.status,
          boolean: true
        })
        const payload = {
          schedule_id: this.id,
          log: `Tarefa com o id ${this.id} foi retomada.`
        }
        postLog(payload)
      })
      .catch(error => {
        this.$store.commit('changeSuccessModal', {
          text: 'não ativada',
          status: error,
          boolean: true
        })
        const payload = {
          schedule_id: this.id,
          log: `Tarefa com o id ${this.id} não pode prosseguir.`
        }
        postLog(payload)
      }) 
    },

    pause: function() {
      pauseJob(this.id)
      .then(result => {
        this.$store.commit('changeSuccessModal', {
          text: 'pausada',
          status: result.status,
          boolean: true
        })
        const payload = {
          schedule_id: this.id,
          log: `Tarefa com o id ${this.id} foi pausada.`
        }
        postLog(payload)
      })
      .catch(error => {
        this.$store.commit('changeSuccessModal', {
          text: 'não pausada',
          status: error,
          boolean: true
        })
        const payload = {
          schedule_id: this.id,
          log: `Tarefa com o id ${this.id} não pode ser pausada.`
        }
        postLog(payload)
      }) 
    },

    logs: async function() {
      this.$store.commit('setScheduleId', this.id)
      this.$store.commit('changeModalLogs', true)
    }, 
  },
}
</script>
<style scoped>

.toolbar-btn {
  margin-left: 4%;
}

</style>