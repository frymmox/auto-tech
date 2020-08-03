export default {
  state: {
    users: []
  },
  mutations: {
    updateUsers(state, users) {
      state.users = users
    },
    addUser(state, newUser) {
      state.users.push(newUser)
    },
    removeUser(state, id) {
      state.users = state.users.filter(user => user.id !== id)
    }
  },
  getters: {
    allUsers(state) {
      return state.users
    },
    validUsers(state) {
      return state.users.filter(user => {
        return user.first_name && user.last_name && user.email && user.avatar
      })
    }
  },
  actions: {
    async fetchUsers(ctx) {
      const res = await fetch(`https://reqres.in/api/users?page=1`)
      const users = await res.json()

      ctx.commit('updateUsers', users.data)
    }
  },
}
