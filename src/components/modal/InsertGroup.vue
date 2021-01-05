<template>
  <v-dialog
    v-model="$store.state.groupModal"
    hide-overlay
    transition="slide-x-reverse-transition"
    max-width="50%"
  >
    <v-card height="100%">
      <v-toolbar dark color="teal">
        <v-btn icon dark @click="$store.commit('changeGroupModal', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Criar Grupo</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn 
          dark 
          text 
          @click="postForm()">Criar </v-btn>
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
</template>

<script>
import { postGroup } from '../../services/endpoits'

export default {
  data: function() {
    return {
      valid: true,
      group: ''
    }
  },

  methods: {
    postForm: function() {
      this.$store.commit('changeGroup', this.group)
      const payload = {
        name: this.$store.getters.group
      }
      postGroup(payload)
    }
  },
}
</script>

<style>

</style>