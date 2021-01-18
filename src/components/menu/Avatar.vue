<template>
    <v-row justify="center">
      <v-btn
        class="btn-avatar"
        icon
        x-large
        @click="activated = true"
      >
        <v-avatar
          size="50"
        >
          <img :src="user.photo_url" />
        </v-avatar>
      </v-btn>
      <v-slide-y-transition>
        <v-card class="avatar-card" v-show="activated">
          <v-list-item-content class="justify-center">
            <v-btn class="btn-avatar-close" icon dark @click="activated = false">
              <v-icon color="red">mdi-close</v-icon>
            </v-btn>
            <div class="mx-auto text-center">
              <v-avatar
                color="brown"
                size="60"
              >
                <img :src="user.photo_url" />
              </v-avatar>
              <div class="avatar-items">
                <h3>{{ user.fullName }}</h3>
                <p class="caption mt-1">
                  {{ user.email }}
                </p>
                <v-divider class="my-2"></v-divider>
                <v-btn
                  depressed
                  rounded
                  text
                  @click="logout()"
                >
                  Logout
                </v-btn>
              </div>
            </div>
          </v-list-item-content>
        </v-card>
      </v-slide-y-transition>
    </v-row>
</template>

<script>
import { getUserMe } from '../../services/endpoits'
import { schedulerApi } from '../../services/api'
import { logout } from '../../utils/auth'

export default {

  data: function() {
    return {
      activated: false,
      user: {
        fullName: '',
        email: '',
        photo_url: ''
      },
    }
  },

  mounted: async function() {
    const user = await getUserMe()
    this.user.photo_url = user['data'].profile_photo_url
    this.user.fullName = user['data'].name
    this.user.email = user['data'].email
  },
  
  methods: {
    logout: function() {
      logout()
    }
  }
}
</script>

<style>
.avatar-card {
  position: absolute !important;
  bottom: -139px !important;
  right: 16px !important;
  width: 13rem;
}
.avatar-items {
  width: 90%;
  font-size: .9em;
  margin: 10px auto auto auto;
}
.btn-avatar-close {
  position: absolute !important;
  left: 75%;
  top: 1%;
  color: red !important;
}
.btn-avatar {
  position: relative;
  right: 5rem;
}
</style>