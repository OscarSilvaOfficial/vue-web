<template>
  <div>
    <v-alert class="alert-success" type="success" v-show="$store.getters.successModal.show" transition="slide-y-reverse-transition">
      {{ $store.getters.successModal.data }}
    </v-alert>
  </div>
</template>
<style>
.alert-success {
  position: absolute !important;
  bottom: 0%;
  left:40%;
}
</style>