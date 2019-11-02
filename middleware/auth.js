const publicRoutes = require('~/routes/public_routes.js')

export default function({ store, route, redirect }) {
  if (publicRoutes.names.includes(route.name)) return

  if (!store.state.auth) {
    return redirect('/login')
  }
}
