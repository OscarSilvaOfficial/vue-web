<template>
  <!-- CONFIRM DELETE -->
        <v-row justify="center">
          <v-dialog
            v-model="$store.getters.deleteModal"
            persistent
            max-width="290"
          >
            <v-card>
              <v-card-title class="headline">
              ID {{ id }} será deletado
              </v-card-title>
              <v-card-text></v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="deleteForm"
                >
                  Confirmar
                </v-btn>
                <v-btn
                  color="green darken-1"
                  text
                  @click="closeModal"
                >
                  Cancelar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <!-- END -->
</template>

<script>
import { removeJob } from '../../services/endpoits'


export default {
  props: {
    id: 0
  },

  methods: {
    deleteForm: function() { 
      removeJob(this.id)
        .then(result => {
          this.$store.commit('changeSuccessModal', {
            text: 'deletada',
            status: result.status,
            boolean: true
          })
          /* Remove dado da tabela */
          this.$store.commit('removeApiData', this.id)
          this.$store.commit('changeDeleteModal', false)
        })
        .catch((error) => {
          this.$store.commit('changeErrorModal', {
            text: 'não deletada',
            status: error,
            boolean: true
          })
        })
    },  
    closeModal: function() {
      this.$store.commit('changeDeleteModal', false)
    }
  },
}
</script>

<style>

</style>