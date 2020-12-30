<template>
  <!-- CONFIRM DELETE -->
        <v-row justify="center">
          <v-dialog
            v-model="$store.state.deleteModal"
            persistent
            max-width="290"
          >
            <v-card>
              <v-card-title class="headline">
                Deseja deletar?
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
                  @click="$store.state.deleteModal = false"
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

methods: {
  deleteForm() { 
    removeJob(this.$store.getters.deleteId)
      .then(result => {
        console.log('Deletado')
        location.reload()
      })
      .catch((error) => {
        console.log(error)
      })
  },  
},
}
</script>

<style>

</style>