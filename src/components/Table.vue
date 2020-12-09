<template>
  <div class="data-table">
    <v-card>
      <v-card-title>
        Scheduler
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Localizar"
          single-line
          hide-details
          class="search-bar"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="cabecalhos"
        :items="dados"
        :single-select="singleSelect"
        item-key="name"
        show-select
        class="elevation-1"
        :search="search"
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-arrow-collapse-left',
          lastIcon: 'mdi-arrow-collapse-right',
          prevIcon: 'mdi-minus',
          nextIcon: 'mdi-plus',
          'items-per-page-text':'Itens por Página',
        }"
      >
      </v-data-table>
      
    </v-card>
  </div>
</template>

<script>
import api from '../services/api';
import axios from 'axios';
import { stringToDate } from '../services/conversor'

export default {
  data() {
    return {
      singleSelect: false,
      search: '',
      cabecalhos: [
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
      dados: [],
    }
  },
  mounted() {
    api.get('/scheduler/jobs')
      .then((res) => {
        // Conversão da data enviada pela API
        for(const data of res.data) {
          data.next_run_time = stringToDate(data.next_run_time)
          data.last_run_time = stringToDate(data.last_run_time)
          if(!data.last_run_time) {
            data.last_run_time = 'Não executado'.toUpperCase()
          }
        }
        this.dados = res.data
      })
  },
}
</script>
<style>

.data-table {
  width: 100%;
}

.search-bar {
  width: 50%;
}

</style>