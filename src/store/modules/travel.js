const SET_EDITABLE = 'SET_EDITABLE'

export default {
  namespaced: true,
  state: {
    editable: false
  },
  mutations: {
    [SET_EDITABLE](state, editable) {
      state.editable = editable
    }
  },
  actions: {
    setEditable({ commit }, editable) {
      commit(SET_EDITABLE, editable)
    }
  }
}