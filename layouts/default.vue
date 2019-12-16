<template>
  <v-app>
    <notifications position="bottom center" />
    <v-navigation-drawer v-model="drawer" app fixed temporary>
      <v-list>
        <v-list-item>
          <v-list-item-title v-text="fullname()"></v-list-item-title>
          <v-list-item-icon>
            <v-icon title="Logout" @click="logout()">mdi-logout</v-icon>
          </v-list-item-icon>
        </v-list-item>

        <v-list-item
          v-for="(item, i) in navItems"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app elevate-on-scroll>
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-spacer>
        <v-form @submit.prevent="initContactsSearch">
          <v-text-field
            hide-details
            prepend-inner-icon="mdi-magnify"
            single-line
            clearable
            autofocus
            clear-icon="mdi-close-circle"
            v-model="search_query"
            hint="Search anything..."
            label="Search anything..."
            @click:clear="clearSearchQuery()"
          ></v-text-field>
        </v-form>
      </v-spacer>
      <v-btn icon dark color="info" nuxt to="/contacts">
        <v-icon>mdi-contacts</v-icon>
      </v-btn>
      <v-btn icon color="success" dark nuxt to="/new-contact">
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      navItems: [
        // {
        //   icon: 'mdi-apps',
        //   title: 'Dashboard',
        //   to: '/'
        // },
        {
          icon: 'mdi-contacts',
          title: 'Contacts',
          to: '/contacts'
        },
        {
          icon: 'mdi-plus-circle',
          title: 'Add contact',
          to: '/new-contact'
        }
      ],
      drawer: false,
      rightDrawer: false,
      search_query: ''
    }
  },

  methods: {
    logout() {
      this.$store.commit('setAuth', null)
      this.$router.push('/login')
    },
    fullname() {
      if (this.$store.state.auth === null) {
        return
      }

      return (
        this.$store.state.auth.user.first_name +
        ' ' +
        this.$store.state.auth.user.last_name
      )
    },
    initContactsSearch() {
      this.$store.commit('setSearchQuery', this.search_query)
      if (this.$router.currentRoute.name !== 'contacts') {
        this.$router.push('/contacts')
      }
    },
    clearSearchQuery() {
      this.$store.commit('setSearchQuery', '')
    }
  }
}
</script>

<style>
#app {
  background-color: #dddddd;
}

.vue-notification {
  font-size: 16px !important;
}
</style>
