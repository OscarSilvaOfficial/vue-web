<template>
  <v-container>
    <v-row>
      <div class="data-table">
        <v-card>
          <v-card-title v-show="$store.getters.showToolBar == false">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Localizar"
              single-line
              hide-details
              class="search-bar"
            ></v-text-field>
          </v-card-title>
          <Toolbar :id="id"/>
          <v-data-table
            fixed-header
            class="elevation-1"
            item-key="id"
            show-select
            height="700px"
            :headers="headers"
            :items="$store.getters.apiData"
            :single-select="singleSelect"
            :search="search"
            :items-per-page="1000"
            :footer-props="{
              showFirstLastPage: false,
              firstIcon: 'mdi-arrow-collapse-left',
              lastIcon: 'mdi-arrow-collapse-right',
              prevIcon: 'mdi-arrow-left',
              nextIcon: 'mdi-arrow-right',
              'items-per-page-text':'Itens por Página',
            }"
          >
            <template v-slot:item="row">
              <tr v-show="getSelectedGroup() == row.item.group_id">
                <td>
                  <v-checkbox @click="showToolBar(row.item.id)"></v-checkbox>
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
                <td>
                  <v-icon 
                  class="icons"
                  dark 
                  color="green" 
                  @click="editModal(row.item)">
                    mdi-pencil
                  </v-icon>
                  <v-icon 
                  class="icons"
                  dark 
                  color="red" 
                  @click="deleteRow(row.item.id)">
                    mdi-cancel
                  </v-icon>
                </td>
              </tr> 
            </template>
          </v-data-table>
        </v-card>
      </div>
    </v-row>
    <DeleteScheduler :id="id"/>
    <EditScheduler />
  </v-container>
</template>

<script>
import replaceData from '../../utils/replaceData'
import DeleteScheduler from '../modal/DeleteScheduler'
import EditScheduler from '../modal/EditScheduler'
import Toolbar from '../menu/Toolbar'

export default {
  components: {
    DeleteScheduler, EditScheduler, Toolbar
  }, 
  
  data() {
    return {
      data: [],
      search: '', /* Inicia o campo de pesquisa */
      id: 0,
      singleSelect: true, /* Seleção de multi campos */
      headers: [
        {
          text: 'Id',
          align: 'start',
          value: 'identificator',
        },
        {
          text: 'Tarefa',
          align: 'start',
          value: 'name',
        },
        { text: 'Cron', value: 'trigger' },
        { text: 'Ultima Execução', value: 'last_run_time' },
        { text: 'Próxima Execução', value: 'next_run_time' },
        { text: 'Metodo HTTP', value: 'func' },
        { text: 'Alterações' },
      ],
    }
  },

  beforeMount: async function() {
    const data = await replaceData()
    this.$store.commit('changeApiData', data)
  },

  methods: {
    setColor: function(args) {
      if (args == 'NÃO EXECUTANDO') return 'red'
      else return 'green'
    },

    deleteRow: function(id) {
      this.$store.commit('changeDeleteModal', true)
      this.id = id
    },

    editModal: function(payload) {
      this.$store.commit('changeEditModal', true)
      this.$store.commit('changeFullData', payload)
    },

    showToolBar: function(id) {
      this.$store.commit("changeToolBar")
      this.id = id
    },

    getSelectedGroup: function() {
      return this.$store.getters.selectedGroup
    }
  }

}
</script>

<style>
.data-table {
  width: 100%;
  height: 200px !important;
}
.search-bar {
  width: 50%;
}
.icons {
  padding: 5%;
  position: relative;
  right: 7%;
}
</style>