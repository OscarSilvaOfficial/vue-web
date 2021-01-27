<template>
  <v-row justify="center">
      <v-row class="modal-scheduler">
      <v-dialog
        v-model="$store.getters.modalLogs"
        hide-overlay
        transition="slide-x-reverse-transition"
        persistent
      >
        <v-card height="100%" color="#2E3436">
          <v-toolbar dark color="teal">
            <v-btn icon dark @click="closeModal()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Execuções</v-toolbar-title>
          </v-toolbar>
          <template>
            <v-data-table
              :headers="headers"
              :items="$store.getters.logs"
              :items-per-page="5"
              class="elevation-1"
            ></v-data-table>
          </template>
          <!-- <div class="terminal">
            <div class="execution">
              
              <div class="display" v-for="(data, index_exec) of this.$store.getters.logs" :key="index_exec">
                  <h3>
                    [{{ toDate(data.exec_date) }}-{{ data.exec_status.toUpperCase() }}-{{ data.destination_url }}]
                    <v-icon 
                      color="white" 
                      small
                      @click="showLogs(index_exec)">mdi-arrow-down-drop-circle-outline</v-icon>
                  </h3>
                  <div 
                    class="logs" 
                    v-for="log of data.exec_logs" 
                    :key="log.id" 
                    v-show="seeLogs == true && class_id == index_exec">
                    {{ log[1] }} na data {{ toDate(log[3]) }}
                  </div>
                <br/>
              </div>
            </div>
          </div> -->
        </v-card>
      </v-dialog>
    </v-row>
  </v-row>
</template>

<script>
import { dateToString } from '../../utils/format'

export default {

  data: function(){
    return {
      seeLogs: false,
      class_id: '',
      headers: [
          {
            text: 'Data de execução',
            align: 'start',
            sortable: true,
            value: 'exec_date',
          },
          {
            text: 'Status',
            value: 'exec_status',
          },
          {
            text: 'Url de execução',
            value: 'destination_url',
          },
        ],
    }
  },
  methods: {
    closeModal: function() {
      this.$store.commit('changeModalLogs', false)
    },

    toDate: function(value) {
      const response = dateToString(value)
      return response
    },

    showLogs: function(class_id) {
      this.class_id = class_id
      this.seeLogs = this.seeLogs == false ? true:false
    },
  },
}
</script>

<style>
.terminal {
  height: 10rem;
  font-size: 14px;
}

.display {
  background-color: #2E3436 !important;
}

.execution {
  display: flex;
  flex-direction: column;
  margin: 15px;
}

.execution h3 {
  font-family: 'Space Mono', monospace;
  color: white;
  font-weight: 100;
}

.logs {
  color: white;
  font-family: 'Space Mono', monospace;
  font-weight: 100;
  margin-left: 30px;
}
</style>