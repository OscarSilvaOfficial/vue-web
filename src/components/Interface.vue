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
      </v-tabs>
      <v-avatar
        color="teal"
        size="40"
      ><img src="https://cdn.iconscout.com/icon/free/png-512/laptop-user-1-1179329.png" alt="Avatar" /></v-avatar>
    </v-app-bar>
    
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <Table :data="payload" :groupState="selectedGroup"/>
        </v-row>
      </v-container>
      <InsertModal title="Criar Schedule" />
    </v-main>
  </v-app>
</template>

<script>
import Table from './Table';
import InsertModal from './modal/InsertModal'
import replaceData from '../utils/replaceData'

export default {
  components: {
    Table, InsertModal
  },
  data() {
    return {
      links: [
        'Grupo 01',
        'Grupo 02',
        'Grupo 03',
      ],
      link: '',
      selectedGroup: '',
      payload: [],
    }
  },
  async mounted() {
    this.selectedGroup = this.links[0] /* Torna o primeiro grupo, o selecionado */
    this.payload = await replaceData() /* Valores recebidos da API para preencher a tabela */
  },

}
</script>