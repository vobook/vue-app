const contactPropertyTypeIcons = require('~/data/contact_property_types.js')

export const state = () => {
  return {
    auth: null,
    contactPropertyTypes: [],
    search_query: ''
  }
}

export const mutations = {
  initAuth(state) {
    if (process.browser && localStorage.getItem('auth')) {
      state.auth = JSON.parse(localStorage.getItem('auth'))
    }
  },

  setAuth(state, auth) {
    state.auth = auth
    localStorage.setItem('auth', JSON.stringify(auth))
  },

  setSearchQuery(state, query) {
    if (query === null) {
      query = ''
    }
    state.search_query = query
  },

  setContactPropertyTypes(state, types) {
    types.forEach(function(el, i) {
      types[i].icon = contactPropertyTypeIcons.icons[el.type]
    })
    state.contactPropertyTypes = types
  }
}

export const getters = {
  getContactPropByType: (state) => (t) => {
    return state.contactPropertyTypes.find((prop) => prop.type === t)
  }
}

export const actions = {}
