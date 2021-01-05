<template>
  <v-app id="inspire">
    <Menu />
    <v-main class="grey lighten-3">
      <Table />
      <InsertScheduler />
      <InsertGroup />
    </v-main>
  </v-app>
</template>

<script>
import Menu from './menu/Menu'
import Table from './table/Table'
import InsertGroup from './modal/InsertGroup'
import InsertScheduler from './modal/InsertScheduler'

import { formatHttpMethod } from '../utils/format.js'
import getNumberRange from '../utils/getNumberRange'
import { postJob, patchJob } from '../services/endpoits'
import replaceData from '../utils/replaceData'

export default {
  components: {
    Menu, 
    InsertScheduler, 
    InsertGroup, 
    Table
  },
}
</script>
