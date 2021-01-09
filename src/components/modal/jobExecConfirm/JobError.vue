<template>
  <div>
    <v-alert class="alert-error" v-show="$store.getters.errorModal.show" type="error" transition="slide-y-reverse-transition">
      {{ $store.getters.errorModal.data }}
    </v-alert>
  </div>
</template>
<style>
.alert-error {
  position: absolute !important;
  bottom: 0%;
  left:40%;
}
</style>