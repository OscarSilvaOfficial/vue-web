export default {
  state: {
    groups: [],
    groupForm: {
      data: '',
      names: [],
      id: [],
    },
  },

  getters: {
    groupFormId: state => state.groupForm.id,
    groupFormData: state => state.groupForm.data,
    groupFormNames: state => state.groupForm.names,
    groups: state => state.groups,
  },

  mutations: {
    changeGroups(state, group) {
      state.groups.push(group)
      state.groupForm.names.push(group.name)
      state.groupForm.id.push(group.id)
    },

    changeGroupForm(state, group_id) {
      state.groupForm.data = group_id
    }
  },
}