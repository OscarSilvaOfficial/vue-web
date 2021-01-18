<template>
  <v-app id="inspire">
    <Menu />
    <v-main class="grey lighten-3">
      <Table />
      <InsertScheduler />
      <EditScheduler />
      <InsertGroup />
      <Success />
      <Error />
    </v-main>
  </v-app>
</template>

<script>
import Menu from './menu/Menu'
import Table from './table/Table'
import InsertGroup from './modal/InsertGroup'
import InsertScheduler from './modal/InsertScheduler'
import EditScheduler from './modal/EditScheduler'
import Success from './modal/jobExecConfirm/JobSuccess'
import Error from './modal/jobExecConfirm/JobError'

export default {
  components: {
    Menu, 
    InsertScheduler, 
    InsertGroup, 
    Table,
    Success,
    Error,
    EditScheduler
  },
}
</script>
