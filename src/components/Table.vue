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
        :items="data"
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
//import replaceData from '../utils/replaceData'


export default {
  props: {
    data: '', /* Recebe todos os dados, e recebe uma lista de objetos */
  },
  data() {
    return {
      singleSelect: true, /* Seleção de multi campos */
      search: '', /* Habilida a barra de pesuisa */
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
    }
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