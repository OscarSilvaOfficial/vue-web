<template>
  <div>
    <v-row class="modal-scheduler">
      <v-dialog
        v-model="$store.getters.editModal"
        hide-overlay
        transition="slide-x-reverse-transition"
        max-width="50%"
      >
        <v-card height="100%">
          <v-toolbar dark color="teal">
            <v-btn icon dark @click="$store.commit('changeEditModal', false)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Editar Tarefa</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn 
              dark 
              text 
              @click="confirmForm()"
              >Editar </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="form"
          >

            <v-select
              v-model="func"
              :items="$store.getters.tarefaSelect"
              label="Tarefa"
              required
              class="input"
            ></v-select>

            <v-text-field
              v-model="name"
              label="Nome da Tarefa"
              required
              class="input"
            ></v-text-field>

            <v-text-field
              v-model="url"
              label="Recurso/URL"
              required
              class="input"
            ></v-text-field>

            <v-text-field
              v-model="body"
              label="Corpo da Requisição"
              required
              v-if="httpMethod() == 'http POST'"
              class="input"
            ></v-text-field>

            <v-select
              v-model="minute"
              :items="$store.getters.minutoSelect"
              label="Min"
              required
              class="mini-input"
            ></v-select>

            <v-select
              v-model="hour"
              :items="$store.getters.horaSelect"
              label="Hora"
              required
              class="mini-input"
            ></v-select>

            <v-select
              v-model="day"
              :items="$store.getters.diaSelect"
              label="Dia"
              required
              class="mini-input"
            ></v-select>

            <v-select
              v-model="month"
              :items="$store.getters.mesSelect"
              label="Mês"
              required
              class="mini-input"
            ></v-select>

            <v-select
              v-model="week"
              :items="$store.getters.semanaSelect"
              label="Semana"
              required
              class="mini-input"
            ></v-select>

            <v-select
              v-model="groups"
              :items="$store.getters.groupFormNames"
              label="Grupo"
              required
              class="input"
            ></v-select>

            <v-text-field
              v-model="observation"
              label="Observações"
              required
              class="input"
            ></v-text-field>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Modal confirm && commit -->
    <v-row justify="center">
      <v-dialog
        v-model="showConfirmedInsert"
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
              @click="postForm()"
            >
              Confirmar
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="showConfirmedInsert = false"
            >
              Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { formatHttpMethod, dateToString } from '../../utils/format.js'
import { patchJob } from '../../services/endpoits'


export default {

  data() {
    return {
      showConfirmedInsert: false,
      notifications: false,
      sound: true,
      widgets: false,
      valid: true,
    }
  },
  
  mounted: function() {
    this.$store.commit('changeGroupForm', this.$store.getters.selectedGroup)
  },

  computed: {
    groups: {
      get() {
        return this.$store.getters.groupFormNames[this.$store.getters.selectedGroup-1]
      },
      set(value) {
        for (let group of this.$store.getters.groups) {
          if (group.name == value) {
            this.$store.commit('changeGroupForm', group.id)
          }
        }
      }
    },
    identificator: {
      get() {
        return this.$store.getters.identificator
      },
      set(value) {
        this.$store.commit('setId', value)
      }
    },
    func: {
      get() {
        return this.$store.getters.tarefaData
      },
      set(func) {
        this.$store.commit('setFunc', func)
      }
    },
    name: {
      get() {
        return this.$store.getters.nome
      },
      set(value) {
        this.$store.commit('setName', value)
      }
    },
    url: {
      get() {
        return this.$store.getters.url
      },
      set(value) {
        this.$store.commit('setUrl', value)
      }
    },
    observation: {
      get() {
        return this.$store.getters.observacoes
      },
      set(value) {
        this.$store.commit('setObservation', value)
      }
    },
    body: {
      get() {
        return this.$store.getters.corpo
      },
      set(value) {
        this.$store.commit('setBody', value)
      }
    },
    name: {
      get() {
        return this.$store.getters.nome
      },
      set(value) {
        return this.$store.commit('setName', value)
      }
    },
    minute: {
      get() {
        return this.$store.getters.minutoData
      },
      set(value) {
        this.$store.commit('setMinute', value)
      }
    },
    hour: {
      get() {
        return this.$store.getters.horaData
      },
      set(value) {
        this.$store.commit('setHour', value)
      }
    },
    day: {
      get() {
        return this.$store.getters.diaData
      },
      set(value) {
        this.$store.commit('setDay', value)
      }
    },
    month: {
      get() {
        return this.$store.getters.mesData
      },
      set(value) {
        this.$store.commit('setMonth', value)
      }
    },
    week: {
      get() {
        return this.$store.getters.semanaData
      },
      set(value) {
        this.$store.commit('setWeek', value)
      }
    },
  },

  methods: {
    httpMethod: function() {
      return this.$store.getters.tarefaData
    },
    confirmForm: function() {
      this.showConfirmedInsert = true
    },

    postForm: function() {
      
      const payload = {
        args: this.$store.getters.corpo ? [this.$store.getters.url, this.$store.getters.corpo]:[this.$store.getters.url],
        day: this.$store.getters.diaData,
        day_of_week: this.$store.getters.semanaData,
        func: formatHttpMethod(this.$store.getters.tarefaData),
        hour: this.$store.getters.horaData,
        id: this.$store.getters.identificator,
        kwargs: {
          headers: {}
        },
        minute: this.$store.getters.minutoData,
        month: this.$store.getters.mesData.toString(),
        name: this.$store.getters.nome,
        observation: this.$store.getters.observacoes,
        trigger: 'cron',
        group_id: this.$store.getters.groupFormData,
      } 
      patchJob(payload)
        .then(result => {
          this.$store.commit('changeSuccessModal', {
            text: 'editada',
            status: result.status,
            boolean: true
          })

          /* Altera os dados da tabela em tempo real */
          payload.next_run_time = dateToString(result.data.next_run_time)
          payload.last_run_time = dateToString(result.data.last_run_time)
          this.$store.commit('refactorApiData', payload)
          
          /* Fecha os modais */
          this.$store.commit('changeEditModal', false)
          this.showConfirmedInsert = false

          /* 
          Desabilida as checkboxes selecionadas 
          */
          this.$store.commit('changeCheckBox', true)
                    
        })
        .catch((error) => {
          this.$store.commit('changeErrorModal', {
            text: 'não editada',
            status: error.status,
            boolean: true
          })
          this.$store.commit('changeEditModal', false)
          this.showConfirmedInsert = false
        })
    },
  }

}
</script>

<style>
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
  width: 20%;
  padding: 1%;
  display: inline-block;
  position: relative;
}
</style>