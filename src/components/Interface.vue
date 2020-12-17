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
          @click="getMenuLink(link)"
        >
         {{ link }}
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
          <Table :data="payload"/>
        </v-row>
      </v-container>
      <Modal />
    </v-main>
  </v-app>
</template>

<script>
import Table from './Table';
import Modal from './Modal'
import { GetUserMe } from '../services/endpoits'
import replaceData from '../utils/replaceData'

export default {
  components: {
    Table, Modal
  },
  data() {
    return {
      links: [
        'Grupo 01',
        'Grupo 02',
        'Grupo 03',
      ],
      payload: [],
      link: [],
    }
  },
  methods: {
    getMenuLink: args => {
      return args
    }
  },
  async mounted() {
    this.payload = await replaceData() /* Valores recebidos da API para preencher a tabela */
  },

}
</script>