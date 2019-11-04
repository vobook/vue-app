const contactPropertyTypeIcons = require('~/data/contact_property_types.js')

export const state = () => {
  return {
    auth: null,
    contactPropertyTypes: []
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
  },

  setContactPropertyTypes(state, types) {
    types.forEach(function(el, i) {
      types[i].icon = contactPropertyTypeIcons.icons[el.type]
    })
    state.contactPropertyTypes = types
  }
}

export const actions = {
  GetContactPropertyTypes({ commit }) {
    console.log('Loading types STORE')

    this.$axios.$get('contact-property-types/').then((res) => {
      commit('setContactPropertyTypes', res)
    })
  }
}
