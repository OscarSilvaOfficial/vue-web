<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="#6be68e"
      flat
    >
      <v-avatar
        color="primary"
        size="40"
      ><img src="/quiteja-icon.png" alt="QuiteJá"></v-avatar>

      <v-tabs
        centered
        class="ml-n9"
        color="dark darken-1"
      >
        <v-tab
          v-for="link in links"
          :key="link"
          @click="selectedGroup = link"
        >
         {{ link }}
        </v-tab>
        <v-tab @click="editGroupState = true">
         <v-icon dark>mdi-plus</v-icon>
        </v-tab>
      </v-tabs>
      <v-avatar
        color="teal"
        size="40"
      ><img src="https://cdn.iconscout.com/icon/free/png-512/laptop-user-1-1179329.png" alt="Avatar" /></v-avatar>
    </v-app-bar>
    
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <!-- Template -->
          <div class="data-table">
            <v-card>
              <v-card-title>
                Scheduler
                <v-spacer></v-spacer>
                <v-text-field
                  v-if="payload[id].group == selectedGroup"
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
                :items="payload"
                item-key="name"
                show-select
                :single-select="singleSelect"
                class="elevation-1"
                @click="id = Object.keys(data)"
                v-if="payload[id].group == selectedGroup"
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
                        @click="showModal(row.item)"
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
                      @click="showModal(row.item)">
                        mdi-pencil
                      </v-icon>
                      <v-icon 
                      class="icons"
                      dark 
                      color="red" 
                      @click="showConfirmDelete(row.item.id)">
                        mdi-cancel
                      </v-icon>
                      <!-- <v-checkbox
                        @click="showModal(row.item)"
                      >
                      </v-checkbox> -->
                    </td>
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
              <!-- <EditModal :data="$store.getters.selectedData" /> -->
            </v-card>
          </div>
          <!-- END -->
          <!-- <Table :data="payload" :groupState="selectedGroup"/> -->
        </v-row>
      </v-container>
      <!-- INSERT -->
      <!-- <InsertModal title="Criar Schedule" /> -->
      <v-row class="modal-scheduler">
        <v-dialog
          v-model="dialog"
          hide-overlay
          transition="slide-x-reverse-transition"
          max-width="50%"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-2 btn-add"
              fab
              dark
              color="teal"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon dark>
                {{ btnIcon }}
              </v-icon>
            </v-btn>
          </template>
          <v-card height="100%">
            <v-toolbar dark color="teal">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Criar Tarefa</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn 
                dark 
                text 
                @click="showConfirmInsert=true"
                >Criar </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              class="form"
            >
              <v-text-field
                v-model="identificator"
                label="Identificador"
                required
              ></v-text-field>

              <v-select
                v-model="tarefa.data"
                :items="tarefa.select"
                label="Tarefa"
                required
              ></v-select>

              <v-text-field
                v-model="nome"
                label="Nome da Tarefa"
                required
              ></v-text-field>

              <v-text-field
                v-model="url"
                label="Recurso/URL"
                required
              ></v-text-field>

              <v-text-field
                v-model="observacoes"
                label="Observações"
                required
              ></v-text-field>

              <v-text-field
                v-model="corpo"
                label="Corpo da Requisição"
                required
                v-if="tarefa.data == 'http POST'"
              ></v-text-field>

              <v-select
                v-model="minuto.data"
                :items="minuto.select"
                label="Min"
                required
              ></v-select>

              <v-select
                v-model="hora.data"
                :items="hora.select"
                label="Hora"
                required
              ></v-select>

              <v-select
                v-model="dia.data"
                :items="dia.select"
                label="Dia"
                required
              ></v-select>

              <v-select
                v-model="mes.data"
                :items="mes.select"
                label="Mês"
                required
              ></v-select>

              <v-select
                v-model="semana.data"
                :items="semana.select"
                label="Semana"
                required
              ></v-select>

            </v-form>
          </v-card>
        </v-dialog>
         <!-- END -->
      </v-row>
      <v-row class="modal-scheduler">
        <v-dialog
          v-model="editModalState"
          hide-overlay
          transition="slide-x-reverse-transition"
          max-width="50%"
        >
         
          <v-card height="100%">
            <v-toolbar dark color="teal">
              <v-btn icon dark @click="closeModal">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Edição de Modal</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn 
                dark 
                text 
                @click="showGroupInsert = true">Editar </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              class="form"
            >

              <v-select
                v-model="tarefa.data"
                :items="tarefa.select"
                label="Tarefa"
                required
              ></v-select>

              <v-text-field
                v-model="nome"
                label="Nome da Tarefa"
                required
              ></v-text-field>

              <v-text-field
                v-model="url"
                label="Recurso/URL"
                required
              ></v-text-field>

              <v-text-field
                v-model="observacoes"
                label="Observações"
                required
              ></v-text-field>

              <v-text-field
                v-model="corpo"
                label="Corpo da Requisição"
                required
                v-if="tarefa.data == 'http POST'"
              ></v-text-field>

              <v-select
                v-model="minuto.data"
                :items="minuto.select"
                label="Min"
                required
              ></v-select>

              <v-select
                v-model="hora.data"
                :items="hora.select"
                label="Hora"
                required
              ></v-select>

              <v-select
                v-model="dia.data"
                :items="dia.select"
                label="Dia"
                required
              ></v-select>

              <v-select
                v-model="mes.data"
                :items="mes.select"
                label="Mês"
                required
              ></v-select>

              <v-select
                v-model="semana.data"
                :items="semana.select"
                label="Semana"
                required
              ></v-select>

            </v-form>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="editGroupState"
          hide-overlay
          transition="slide-x-reverse-transition"
          max-width="50%"
        >
          <!-- CREATE GROUP -->
          <v-card height="100%">
            <v-toolbar dark color="teal">
              <v-btn icon dark @click="editGroupState = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Criar Grupo</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn 
                dark 
                text 
                @click="showConfirmGroup = true">Criar </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              class="form"
            >

              <v-text-field
                v-model="group"
                label="Nome do Grupo"
                required
              ></v-text-field>

            </v-form>
          </v-card>
        </v-dialog>
         <!-- END -->

        <!-- Confirm -->
        <v-row justify="center">
          <v-dialog
            v-model="showConfirmInsert"
            persistent
            max-width="290"
          >
            <v-card>
              <v-card-title class="headline">
                Deseja confirmar?
              </v-card-title>
              <v-card-text></v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  v-if="corpo"
                  @click="postForm(
                    [identificator, tarefa.data, nome, [url, corpo], observacoes,
                    minuto.data, hora.data, dia.data, mes.data, semana.data]
                   )"
                >
                  Confirmar
                </v-btn>
                <v-btn
                  color="green darken-1"
                  text
                  v-else
                  @click="postForm(
                    [identificator, tarefa.data, nome, [url], observacoes,
                    minuto.data, hora.data, dia.data, mes.data, semana.data]
                   )"
                >
                  Confirmar
                </v-btn>
                <v-btn
                  color="green darken-1"
                  text
                  @click="showConfirmInsert = false"
                >
                  Cancelar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

        <v-row justify="center">
          <v-dialog
            v-model="showConfirmEdit"
            persistent
            max-width="290"
          >
            <v-card>
              <v-card-title class="headline">
                Deseja confirmar?
              </v-card-title>
              <v-card-text></v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  v-if="corpo"
                  @click="editForm(
                    [identificator, tarefa.data, nome, [url, corpo], observacoes,
                    minuto.data, hora.data, dia.data, mes.data, semana.data]
                   )"
                >
                  Confirmar
                </v-btn>
                <v-btn
                  color="green darken-1"
                  text
                  v-else
                  @click="editForm(
                    [identificator, tarefa.data, nome, [url], observacoes,
                    minuto.data, hora.data, dia.data, mes.data, semana.data]
                   )"
                >
                  Confirmar
                </v-btn>
                <v-btn
                  color="green darken-1"
                  text
                  @click="showConfirmEdit = false"
                >
                  Cancelar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

        <v-row justify="center">
          <v-dialog
            v-model="showConfirmGroup"
            persistent
            max-width="290"
          >
            <v-card>
              <v-card-title class="headline">
                Deseja confirmar?
              </v-card-title>
              <v-card-text></v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click=""
                >
                  Confirmar
                </v-btn>
                <v-btn
                  color="green darken-1"
                  text
                  @click="showConfirmGroup = false "
                >
                  Cancelar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        
        <!-- CONFIRM DELETE -->
          <DeleteModal />
        <!-- END -->
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import DeleteModal from './modal/DeleteModal';
import { formatHttpMethod } from '../utils/format.js'
import getNumberRange from '../utils/getNumberRange'
import { postJob, patchJob } from '../services/endpoits'
import replaceData from '../utils/replaceData'

export default {
  components: {
    DeleteModal
  },
  data() {
    return {
      /* TABLE */
      id: 0,
      singleSelect: true, /* Seleção de multi campos */
      search: '', /* Inicia o campo de pesquisa */
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
      /* END */
      /* INSERT */
      title: 'Criação de Tarefa',
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      btnIcon: "mdi-plus",

      identificator: '',

      tarefa: {
        data: null,
        select: [
          'http GET',
          'http POST'
        ],
      },  

      nome: '',
      url: '',
      observacoes: '',
      corpo: '',

      minuto:{
        select: getNumberRange(0, 59), /* Arrey com os minutos */
        data: ''
      }, 

      hora:{
        select: getNumberRange(0, 24), /* Arrey com a horas */
        data: ''
      }, 

      dia:{
        select: getNumberRange(1, 31), /* Arrey com todos os dias de um mês */
        data: ''
      }, 

      mes:{
        select: getNumberRange(1, 12),
        data: ''
      },  

      semana:{
        select: getNumberRange(1, 6),
        data: ''
      }, 

      fullWidth: false,
      valid: true,
      /* END */
      links: [
        'Grupo 01',
        'Grupo 02',
        'Grupo 03',
      ],
      link: '',
      selectedGroup: '',
      payload: [],

      /* EDIT */
      editModalState: false,
      editGroupState: false,
      
      /* END */
      /* showConfirmDelete: false, */
      showConfirmGroup: false,
      showConfirmEdit: false,
      showConfirmInsert: false,
    }
  },
  async mounted() {
    this.selectedGroup = this.links[0] /* Torna o primeiro grupo, o selecionado */
    this.payload = await replaceData() /* Valores recebidos da API para preencher a tabela */
  },
  methods: {
    /* TABLE */
    setColor: function(args) {
      if (args == 'NÃO EXECUTANDO') return 'red'
      else return 'green'
    },
    getRow: function(id) {
      for(const data of this.payload){
        if(data.id == id) {
          data.type = 'changeSelectedData'
          this.$store.commit(data)
          break 
        }
      }
      /* Inserir aqui a troca para fechar ou abrir o modal */
    },
    /* END */
    /* INSERT */
    validate () {
      this.$refs.form.validate()
    },
    postForm(job) {
      const urls = []
      for(let i of job[3]){
        urls.push(i)
      } 

      const payload = {
        args: urls,
        day: job[7],
        day_of_week: job[9],
        func: formatHttpMethod(job[1]),
        hour: job[6],
        id: job[0],
        kwargs: {
          headers: {}
        },
        minute: job[5],
        month: job[8].toString(),
        name: job[2],
        observation: job[4],
        trigger: 'cron',
      } 
      postJob(payload)
        .then((result) => {
          alert(`Tarefa inserida`)
          location.reload();
        })
        .catch((error) => {
          alert(error)
        })
      /* END */
    },
    /* EDIT */
    showModal: function(kwargs) {
      this.editModalState = true
      this.identificator = kwargs.id
      this.tarefa.data = this.tarefa.select[kwargs.func == 'jobs:http_get' ? 0:1]
      this.nome = kwargs.name
      this.url = kwargs.args[0]
      this.observacoes = kwargs.observation
      this.corpo = kwargs.args[1] != undefined ? kwargs.args[1] : null  
      this.minuto.data = this.minuto.select[kwargs.minute]
      this.hora.data = this.hora.select[kwargs.hour]
      this.dia.data = this.dia.select[kwargs.day-1]
      this.mes.data = this.mes.select[kwargs.month-1]
      this.semana.data = this.semana.select[kwargs.day_of_week-1]
    },
    editForm(job) {
      const urls = []
      for(let i of job[3]){
        urls.push(i)
      } 

      const payload = {
        args: urls,
        day: job[7],
        day_of_week: job[9],
        func: formatHttpMethod(job[1]),
        hour: job[6],
        id: job[0],
        kwargs: {
          headers: {}
        },
        minute: job[5],
        month: job[8].toString(),
        name: job[2],
        observation: job[4],
        trigger: 'cron',
      } 
      patchJob(payload)
        .then((result) => {
          location.reload();
        })
        .catch((error) => {
          alert(error)
        })
    },
    /* END */
    /* DELETE */
    showConfirmDelete(id) {
      this.$store.commit('changeDeleteModal', id)
    },
    /* END */
    closeModal: function() {
      this.editModalState = false
    }
},

}
</script>
<style>
/* TABLE */
.data-table {
  width: 100%;
  position: relative;
}
.search-bar {
  width: 50%;
}

.icons {
  padding: 5%;
  position: relative;
  right: 7%;
}
/* END */
/* INSERT */
.btn-add {
  position: fixed !important;
  bottom: 0%;
  left: 96%;
}

.modal-scheduler {
  margin-left: 100rem;
}

.form {
  width: 90%;
  margin: 1% auto auto auto;
}

.input {
  padding: 1%;
}

.mini-input {
  width: 50%;
  padding: 1%;
  display: inline-block;
  position: relative;
}
/* END */
</style>