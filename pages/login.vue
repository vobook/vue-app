<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-form method="post" @submit.prevent="login">
              <v-card outlined>
                <v-card-text>
                  <p class="display-1 text--primary text-center">
                    welcome to vobook
                  </p>
                  <v-text-field
                    v-model="email"
                    label="Login"
                    name="email"
                    prepend-icon="mdi-email"
                    type="text"
                    autofocus
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-key"
                    type="password"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn type="submit" color="primary"
                    >&nbsp;&nbsp;&nbsp;Submit&nbsp;&nbsp;&nbsp;</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-form>
            <p></p>
            <p class="text-center">
              <v-btn :nuxt="true" to="/restore-password" outlined small
                >Restore password</v-btn
              >
              <v-btn :nuxt="true" to="/register" outlined small
                >Create account</v-btn
              >
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  layout: 'simple',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        await this.$axios
          .$post('/login/', {
            email: this.email,
            password: this.password
          })
          .then((resp) => {
            if (resp.token) {
              this.$store.commit('setAuth', resp)
              this.$router.push('/')
            }
          })
      } catch (e) {
        this.$toast.error(e.response.data.error)
      }
    }
  }
}
</script>
