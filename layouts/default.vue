<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" app fixed expand-on-hover permanent>
      <v-list>
        <v-list-item>
          <v-list-item-title v-text="fullname()"></v-list-item-title>
          <v-list-item-icon>
            <v-icon @click="logout()" title="Logout">mdi-logout</v-icon>
          </v-list-item-icon>
        </v-list-item>

        <v-list-item
          v-for="(item, i) in items"
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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="true" temporary fixed>
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>items to be added</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
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
