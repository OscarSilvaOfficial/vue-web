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
        >
          {{ link }}
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
              <!--  -->
            </v-sheet>
          </v-col>
          <v-col
            cols="12"
            sm="8"
          >
          <Table />
          </v-col>
          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
      <Modal />
    </v-main>
  </v-app>
</template>

<script>
import Table from './Table';
import Modal from './Modal'

export default {
    components: {
      Table,
      Modal
    },
    data: () => ({
      links: [
        'Grupo 01',
        'Grupo 02',
        'Grupo 03',
      ],
    }),
  }
</script>