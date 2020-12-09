<template>
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
      <v-card
        height="100%"
      >
        <v-toolbar
          dark
          color="teal"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Criar Schedule</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="dialog = false"
            >
              Criar
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list
          three-line
          subheader
        >
          <v-subheader>User Controls</v-subheader>
        </v-list>
        <v-divider></v-divider>
        <v-list
          three-line
          subheader
        >
          <v-subheader>General</v-subheader>
          
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      btnIcon: 'mdi-plus',
    }
  },
}
</script>

<style>

.btn-add {
  position: fixed;
  bottom: 10%;
  right: 5%;
}

.modal-scheduler {
  margin-left: 100rem;
}
</style>