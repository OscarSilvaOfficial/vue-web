<template>
  <div class="data-table">
    <v-card>
      <v-card-title>
        Scheduler
        <v-spacer></v-spacer>
        <v-text-field
          v-if="data[id].group == groupState"
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
        @click="id = Object.keys(data)"
        v-if="data[id].group == groupState"
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
        <template v-slot:item="row">
          <tr>
            <td>
              <v-checkbox
                @click="getRow([row.item.id])"
              >
              </v-checkbox>
            </td>
            <td>{{ row.item.id }}</td>
            <td>{{ row.item.name }}</td>
            <td>{{ row.item.trigger }}</td>
            <td>
              <v-chip
                :color="setColor(row.item.last_run_time)"
                dark
              >
                {{ row.item.last_run_time }}
              </v-chip>
            </td>
            <td>{{ row.item.next_run_time }}</td>
            <td>{{ row.item.func }}</td>
          </tr> 
        </template>
      </v-data-table>
      <v-data-table
        :headers="cabecalhos"
        :single-select="singleSelect"
        item-key="name"
        class="elevation-1"
        v-else
        no-data-text="Grupo não possui tarefa"
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-arrow-collapse-left',
          lastIcon: 'mdi-arrow-collapse-right',
          prevIcon: 'mdi-minus',
          nextIcon: 'mdi-plus',
          'items-per-page-text':'Itens por Página',
        }"
      ></v-data-table> 
      <EditModal :data="$store.getters.selectedData" />
    </v-card>
  </div>
</template>

<script>
import EditModal from './modal/EditModal'

export default {
  components: {
    EditModal
  },
  props: {
    data: '', /* Recebe todos os dados, e recebe uma lista de objetos */
    groupState: '', /* Identifica qual grupo foi selecionado */
  },
  data() {
    return {
      id: 0,
      singleSelect: true, /* Seleção de multi campos */
      search: '', /* Inicia o campo de pesquisa */
      cabecalhos: [
        {
          text: 'Id',
          align: 'start',
          sortable: false,
          value: 'identificator',
        },
        {
          text: 'Tarefa',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Cron', value: 'trigger' },
        { text: 'Ultima Execução', value: 'last_run_time' },
        { text: 'Próxima Execução', value: 'next_run_time' },
        { text: 'Metodo HTTP', value: 'func' },
      ],
    }
  },
  methods: {
    setColor: function(args) {
      if (args == 'NÃO EXECUTADO') return 'red'
      else return 'green'
    },
    getRow: function(id) {
      const payload = this.data
      for(const data of payload){
        if(data.id == id) {
          data.type = 'changeSelectedData'
          this.$store.commit(data)
          break 
        }
      }
      this.$store.commit('changeModal');
    },
  },
}
</script>
<style>
.data-table {
  width: 100%;
  position: relative;
}

.search-bar {
  width: 50%;
}
</style>