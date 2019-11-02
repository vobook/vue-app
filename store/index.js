export const state = () => {
  return {
    auth: null
  }
}

export const mutations = {
  initAuth(state) {
    console.log('init auth')
    if (localStorage.getItem('auth')) {
      state.auth = JSON.parse(localStorage.getItem('auth'))
    }
  },

  setAuth(state, auth) {
    state.auth = auth
    localStorage.setItem('auth', JSON.stringify(auth))
  }
}

export const actions = {}
