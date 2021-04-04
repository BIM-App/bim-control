const state = {
  projectId: '',
  projectIdModel: ''
}

const mutations = {
  SET_PID(state, projectId) {
    state.projectId = projectId
  },
  SET_PID_Model(state, projectIdModel) {
    state.projectIdModel = projectIdModel
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
