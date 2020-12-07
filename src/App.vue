<template>
  <v-app>
    <v-main>
      <Interface />
    </v-main>
  </v-app>
</template>

<script>
import Interface from './components/Interface';

export default {
  name: 'App',

  components: {
    Interface,
  },
};
</script>
