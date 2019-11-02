// this is very dirty hack
// to load auth creds from localstorage to store
// idk how to do better
// @todo

let authLoaded = false

export default ({ store }) => {
  if (authLoaded) {
    return
  }

  store.commit('initAuth')
  authLoaded = true
}
