const state = {
  projectId: ''
}

const mutations = {
  SET_PID(state, projectId) {
    state.projectId = projectId
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
