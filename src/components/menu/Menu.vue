<template>
    <v-app-bar
      app
      color="#6be68e"
      flat
    >
      <v-avatar
        color="brown"
        size="45"
        class="logo-icon"
      >
        <img src="https://s3-sa-east-1.amazonaws.com/gorillascode-auth/apps/5.png">
      </v-avatar>
      
      <v-tabs
        centered
        class="ml-n9"
        color="dark darken-1"
      >
        <v-tab
          v-for="group in $store.getters.groups"
          :key="group.id"
          @click="changeSelectedGroup(group.id)"
        >
         {{ group.name }}
        </v-tab>
        <v-tab @click="openGroupModal()">
         <v-icon dark>mdi-plus</v-icon>
        </v-tab>
      </v-tabs>
      <Avatar />
    </v-app-bar>
</template>

<script>
import { getGroups } from '../../services/endpoits'
import Avatar from './Avatar'

export default {

  components: {
    Avatar
  },

  data: function() {
    return {
      groups: '',
    }
  },

  beforeCreate: async function() {
    this.groups = await getGroups()
    this.groups.data.forEach(groupInfo => {
      this.$store.commit('changeGroups', groupInfo)
    });
  },

  mounted: function() {
    /* Seleciona o grupo Default */
    this.changeSelectedGroup(1)
  },

  methods: {
    changeSelectedGroup: function(group) {
      this.$store.commit('changeSelectedGroup', group)
    },

    openGroupModal: function() {
      this.$store.commit('changeGroupModal', true)
    }
  }
}
</script>

<style>
/* .scheduler-text {
  font-family: 'Audiowide', cursive;
  font-weight: 400;
  font-size: 2rem;
  position: relative;
  top: 10%;
} */

.logo-icon {
  position: relative;
  left: 3%;
}
</style>