<template>
  <v-app>
    <notifications position="bottom center" />
    <v-navigation-drawer v-model="drawer" app fixed temporary dark>
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
    <v-app-bar fixed app>
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn color="success" dark nuxt to="/new-contact" depressed>
        New contact
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
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/'
        },
        {
          icon: 'mdi-contacts',
          title: 'Contacts',
          to: '/contacts'
        }
      ],
      drawer: false,
      rightDrawer: false,
      title: 'vobook'
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
