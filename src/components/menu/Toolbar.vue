<template>
  
  <v-card
    color="grey lighten-4"
    flat
    tile
    v-show="$store.state.showToolBar"
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
        @click="run()"
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
import { runJob, resumeJob, pauseJob } from '../../services/endpoits'
import LogsScheduler from '../modal/LogsScheduler'

export default {
  props: ['id'],

  components: {
    LogsScheduler
  },

  methods: {
    run: function() {
      runJob(this.id)
      .then(result => {
        this.$store.commit('setLog', `Tarefa cujo id é ${this.id} está rodando`)
      })
      .catch(error => {
        this.$store.commit('setLog', `Tarefa cujo id é ${this.id} aprensentou erro ao rodar`)
      }) 
    },

    resume: function() {
      resumeJob(this.id)
      .then(result => {
        this.$store.commit('setLog', `Tarefa cujo id é ${this.id} foi removido`)
      })
      .catch(error => {
        this.$store.commit('setLog', `Tarefa cujo id é ${this.id} não pode ser removido`)
      }) 
    },

    pause: function() {
      pauseJob(this.id)
      .then(result => {
        this.$store.commit('setLog', `Tarefa cujo id é ${this.id} está pausada`)
      })
      .catch(error => {
        this.$store.commit('setLog', `Tarefa cujo id é ${this.id} não pode ser pausada`)
      }) 
    },

    logs: function() {
      this.$store.commit('changeModalLogs', true)
    }
  },
}
</script>
<style scoped>

.toolbar-btn {
  margin-left: 4%;
}

</style>