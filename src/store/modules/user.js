const getDefaultState = () => {
  return {
    user: {},
    token: '',
    name: '',
    avatar: '',
    role: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

