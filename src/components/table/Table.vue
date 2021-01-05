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
            :headers="cabecalhos"
            :items="data"
            item-key="name"
            show-select
            :single-select="singleSelect"
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
            <template v-slot:item="row">
              <tr v-if="getSelectedGroup() == row.item.group">
                <td>
                  <v-checkbox
                    @click="showToolBar(row.item.id)"
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
      cabecalhos: [
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

  async mounted() {
    this.data = await replaceData()
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
      console.log(this.$store.getters.selectedGroup)
      return this.$store.getters.selectedGroup
    }
  }

}
</script>

<style>
.data-table {
  width: 100%;
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