<template>
  <div class="data-table">
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      :single-select="singleSelect"
      item-key="name"
      show-select
      class="elevation-1"
    >
    </v-data-table>
  </div>
</template>

<script>
import api from '../services/api';
import axios from 'axios';
import { stringToDate } from '../services/conversor'

  export default {
    data () {
      return {
        singleSelect: false,
        selected: [],
        headers: [
          {
            text: 'Tarefa',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Cron', value: 'trigger' },
          { text: 'Ultima Execução', value: 'last_run_time' },
          { text: 'Próxima Execução', value: 'next_run_time' },
        ],
        desserts: [],
      }
    },
    mounted() {
      api.get('/scheduler/jobs')
        .then((res) => {
          // Conversão da data enviada pela API
          for(const data of res.data) {
            data.last_run_time = stringToDate(data.last_run_time)
            data.next_run_time = stringToDate(data.next_run_time)
          }
          this.desserts = res.data
        })
    },
  }
</script>
<style>

.data-table {
  widows: 10rem;
}

</style>