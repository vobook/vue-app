export default ({ store }) => {
  if (store.state.contactPropertyTypes.length !== 0) {
    return
  }

  if (store.state.auth === null) {
    return
  }

  console.log('Loading types MW')

  store.dispatch('GetContactPropertyTypes')
}
