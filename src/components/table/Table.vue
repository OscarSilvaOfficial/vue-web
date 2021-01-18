<template>
  <div>
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
            height="600px"
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
                  <v-checkbox 
                  @click="showToolBar(row.item.id)"
                  v-model="checkBoxes" 
                  :value="row.item.id"></v-checkbox>
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
                <td>
                  <v-chip
                    :color="setColor(row.item.next_run_time)"
                    dark
                  >
                  {{ row.item.next_run_time }}
                  </v-chip>
                </td>
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
  </v-container>
  </div>
</template>

<script>
import { replaceApiData } from '../../utils/format'
import DeleteScheduler from '../modal/DeleteScheduler'
import Toolbar from '../menu/Toolbar'

export default {
  components: {
    DeleteScheduler, Toolbar
  }, 

  computed: {
    checkBoxes: {
      get() {
        return this.$store.getters.checkbox
      }, 
      set(value) {
        this.$store.commit('changeCheckBox', value)
      }
    }
  },
  
  data() {
    return {
      /* checkbox:  false, */
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
    /* 
    Carraga os dados da API formatados 
    */
    const data = await replaceApiData()
    this.$store.commit('setApiData', data)
  },

  methods: {
    setColor: function(args) {
      /* 
      Altera a cor dependendo do comportamento  dos dados
      */
      return args == 'NÃO EXECUTANDO' ? 'red':'green'
    },

    deleteRow: function(id) {
      /* 
      Mostrar modal para deletar registro via Vuex
      e envia o ID para deletar via props
      */
      this.$store.commit('changeDeleteModal', true)
      this.id = id
    },

    editModal: function(payload) {
      /* 
      Altera estado da modal para edição 
      e envia os dados para a modal via Vuex
      */
      this.$store.commit('changeEditModal', true)
      this.$store.commit('changeFullData', payload)
    },

    showToolBar: function(id) {
      /* 
      Mostra a toolbar via Veux e altera o comportamento das checkbox
      */
      if (id != null) {
        this.$store.commit("changeToolBar", true)
        this.id = id
        if (this.checkBoxes == null) {
          this.$store.commit("changeToolBar", false)
        }
      }
    },

    getSelectedGroup: function() {
      /* 
      Retorna o grupo selecionado para mostrar 
      apenas os registros correspondentes ao grupo
      */
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