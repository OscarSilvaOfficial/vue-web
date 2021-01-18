<template>
  <v-row justify="center">
      <v-row class="modal-scheduler">
      <v-dialog
        v-model="$store.getters.modalLogs"
        hide-overlay
        transition="slide-x-reverse-transition"
        max-width="50%"
      >
        
        <v-card height="100%" color="#2E3436">
          <v-toolbar dark color="teal">
            <v-btn icon dark @click="closeModal()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Logs</v-toolbar-title>
          </v-toolbar>
          <div class="terminal">
            <div class="logs" v-for="data in this.$store.getters.logs" :key="data.id">
              <p>
                <span class="log-host">schedulerLog</span>
                <span class="arrow">➜</span> 
                <span class="log-msg">{{ data.log }}</span>
              </p>
              <br/>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </v-row>
</template>

<script>
export default {
  methods: {
    closeModal: function() {
      this.$store.commit('changeModalLogs', false)
    }
  }
}
</script>

<style>
.terminal {
  height: 10rem;
  font-size: 100%;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.logs {
  margin: 0% auto 0% 0%;
  background-color: #2E3436 !important;
  position: relative;
}

.logs p {
  margin-left: 2%;
  height: 0rem;
}

.arrow {
  color: red;
  font-size: 1.6rem;
  position: relative;
  top: .2rem;
}

.log-msg {
  color: aliceblue;
  margin-left: 1%;
  position: relative;
  top: .1rem;
}

.log-host {
  color: aqua;
  margin-right: 1%;
  font-weight: 1000;
}
</style>