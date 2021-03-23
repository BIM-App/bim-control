const state = {
  projectid: null
}

const mutations = {
  SET_projectid(state, projectid) {
    state.projectid = projectid
    console.log(projectid)
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
