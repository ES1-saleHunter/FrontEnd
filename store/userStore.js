const fields = {
  name: '',
  email: '',
  isadm: 0,
  state: 1
}

export const state = () => ({
  user: Object.assign({}, fields),
})

const actions = {
  fetchUser({ commit }) {
    this.$fetchUser().then((data) => {
      commit('setUser', data)
    })
  }
}


const mutations = {
  setUSer(state, value) {
    state.user = value
  }
}

export default {
  state,
  actions,
  mutations,
}