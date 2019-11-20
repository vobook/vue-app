export default (ctx) => {
  if (ctx.store.state.contactPropertyTypes.length !== 0) {
    return
  }
  if (ctx.store.state.auth === null) {
    return
  }
  return ctx.app.$axios.$get('contact-property-types/').then((resp) => {
    ctx.store.commit('setContactPropertyTypes', resp)
  })
}
