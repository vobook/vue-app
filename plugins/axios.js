// const publicRoutes = require('~/routes/public_routes.js')

export default function({ $axios, store, route, redirect }) {
  $axios.onRequest((config) => {
    config.headers.common['X-Client'] = '1'

    // if (store.state.auth && !publicRoutes.names.includes(route.name)) {
    if (store.state.auth) {
      config.headers.common.Authorization = 'Bearer ' + store.state.auth.token
    }
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)

    if (code === 401) {
      store.commit('setAuth', null)

      if (route.name !== 'login') {
        redirect('/login')
      }
    }
  })
}
