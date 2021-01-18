export default {

  state: {
    deleteModal: false,
    editModal: false,
    showToolBar: false,
    modalLogs: false,
    groupModal: false,

    successModal:{
      show: false,
      data: '',
    } ,

    errorModal: {
      show: false,
      data: '',
    },
  },

  getters: {
    groupModal: state => state.groupModal,
    modalLogs: state => state.modalLogs,
    successModal: state => state.successModal,
    errorModal: state => state.errorModal,
    deleteModal: state => state.deleteModal,
    editModal: state => state.editModal,
    showToolBar: state => state.showToolBar
  },

  mutations: {
    changeGroupModal(state, value) {
      state.groupModal = value
    },

    changeModalLogs(state, boolean) {
      state.modalLogs = boolean
    },

    changeToolBar(state, boolean) {
      state.showToolBar = boolean
    },

    changeDeleteModal(state, boolean) {
      state.deleteModal = boolean
    },

    changeEditModal(state, boolean) {
      state.editModal = boolean
    },

    changeSuccessModal(state, data) {
      state.successModal.show = data.boolean
      state.successModal.data = `Tarefa ${data.text} | Status: ${data.status}`
      setTimeout(function() { 
        state.successModal.show = false
      }, 3000)
    },

    changeErrorModal(state, data) {
      state.errorModal.show = data.boolean
      state.errorModal.data = `Tarefa ${data.text} | Status: ${data.status}`
      setTimeout(function() { 
        state.errorModal.show = false
      }, 3000)
    },
  }
  
}