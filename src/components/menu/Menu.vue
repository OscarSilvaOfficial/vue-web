<template>
    <v-app-bar
      app
      color="#6be68e"
      flat
    >
      <p class="scheduler-text">SCHEDULER</p> 
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
      <v-avatar
        color="teal"
        size="40"
      ><img src="https://cdn.iconscout.com/icon/free/png-512/laptop-user-1-1179329.png" alt="Avatar" /></v-avatar>
    </v-app-bar>
</template>

<script>
import { getGroups } from '../../services/endpoits'

export default {

  data: function() {
    return {
      groups: ''
    }
  },

  beforeCreate: async function() {
    this.groups = await getGroups()
    this.groups.data.forEach(groupInfo => {
      this.$store.commit('changeGroups', groupInfo)
    });
  },

  mounted: function() {
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

.scheduler-text {
  font-family: 'Audiowide', cursive;
  font-weight: 400;
  font-size: 2rem;
  position: relative;
  top: 10%;
}

</style>