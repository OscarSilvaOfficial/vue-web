<template>
  <div class="data-table">
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      :single-select="singleSelect"
      item-key="name"
      show-select
      class="elevation-1"
    >
    </v-data-table>
  </div>
</template>

<script>
import api from '../services/api';

  export default {
    data () {
      return {
        singleSelect: false,
        selected: [],
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [],
      }
    },
    mounted() {
      api.get('/api')
        .then((res) => {
          console.log(res.data)
          this.desserts = res.data
        })
    },
  }
</script>
<style>

</style>