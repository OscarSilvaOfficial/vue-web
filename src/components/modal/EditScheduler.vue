<template>
  <div>
    <v-row class="modal-scheduler">
      <v-dialog
        v-model="$store.state.editModal"
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
            <v-text-field
              v-model="$store.state.identificator"
              label="Identificador"
              required
            ></v-text-field>

            <v-select
              v-model="$store.state.tarefa.data"
              :items="$store.state.tarefa.select"
              label="Tarefa"
              required
            ></v-select>

            <v-text-field
              v-model="$store.state.nome"
              label="Nome da Tarefa"
              required
            ></v-text-field>

            <v-text-field
              v-model="$store.state.url"
              label="Recurso/URL"
              required
            ></v-text-field>

            <v-text-field
              v-model="$store.state.observacoes"
              label="Observações"
              required
            ></v-text-field>

            <v-text-field
              v-model="$store.state.corpo"
              label="Corpo da Requisição"
              required
              v-if="$store.state.tarefa.data == 'http POST'"
            ></v-text-field>

            <v-select
              v-model="$store.state.minuto.data"
              :items="$store.state.minuto.select"
              label="Min"
              required
            ></v-select>

            <v-select
              v-model="$store.state.hora.data"
              :items="$store.state.hora.select"
              label="Hora"
              required
            ></v-select>

            <v-select
              v-model="$store.state.dia.data"
              :items="$store.state.dia.select"
              label="Dia"
              required
            ></v-select>

            <v-select
              v-model="$store.state.mes.data"
              :items="$store.state.mes.select"
              label="Mês"
              required
            ></v-select>

            <v-select
              v-model="$store.state.semana.data"
              :items="$store.state.semana.select"
              label="Semana"
              required
            ></v-select>

            <v-select
              v-model="$store.state.semana.data"
              :items="$store.state.semana.select"
              label="Semana"
              required
            ></v-select>

            <!-- Arrumar Gambi -->
            <v-select
              v-model="this.$store.state.groupForm.data = this.$store.getters.groupForm.names[this.$store.getters.selectedGroup-1]"
              :items="$store.getters.groupForm.names"
              label="Grupo"
              required
            ></v-select>

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
import { formatHttpMethod } from '../../utils/format.js'
import { patchJob } from '../../services/endpoits'

export default {

  data() {
    return {
      showConfirmedInsert: false,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      valid: true,
    }
  },

  methods: {
    confirmForm: function() {
      this.showConfirmedInsert = true
    },

    validate: function() {
      this.$refs.form.validate()
    },

    getGroupId(name) {
      let counter = 0
      for (let n of this.$store.getters.groups) {
        counter++
        console.log(n.name)
        if (name == n.name) {
          break
        }
      }
      return counter
    },

    postForm: function() {
      const payload = {
        args: this.$store.state.corpo ? [this.$store.state.url, this.$store.state.corpo]:[this.$store.state.url],
        day: this.$store.state.dia.data,
        day_of_week: this.$store.state.semana.data,
        func: formatHttpMethod(this.$store.state.tarefa.data),
        hour: this.$store.state.hora.data,
        id: this.$store.state.identificator,
        kwargs: {
          headers: {}
        },
        minute: this.$store.state.minuto.data,
        month: this.$store.state.mes.data.toString(),
        name: this.$store.state.nome,
        observation: this.$store.state.observacoes,
        trigger: 'cron',
        group_id: this.getGroupId(this.$store.state.groupForm.data), 
      } 
      patchJob(payload)
        .then((result) => {
          alert(`Tarefa alterada`)
          /* location.reload(); */
        })
        .catch((error) => {
          alert(error)
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
  width: 50%;
  padding: 1%;
  display: inline-block;
  position: relative;
}
</style>