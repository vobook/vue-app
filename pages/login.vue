<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-dialog
            v-model="loginDialog"
            persistent
            no-click-animation
            max-width="400px"
          >
            <v-card>
              <v-card-title>
                <v-spacer></v-spacer>
                <div class="headline text-center">welcome to vobook</div>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form method="post" @submit.prevent="login">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="email"
                          label="Login"
                          name="email"
                          prepend-icon="mdi-email"
                          type="text"
                          autofocus
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="password"
                          label="Password"
                          name="password"
                          prepend-icon="mdi-key"
                          type="password"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" class="text-center">
                        <v-btn type="submit" color="primary"
                          >&nbsp;&nbsp;&nbsp;Submit&nbsp;&nbsp;&nbsp;</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
              <v-card-actions class="text-center">
                <v-spacer></v-spacer>
                <v-btn
                  :nuxt="true"
                  to="/restore-password"
                  color="blue darken-1"
                  small
                  text
                  >Restore password</v-btn
                >
                <v-btn
                  :nuxt="true"
                  to="/register"
                  color="blue darken-1"
                  small
                  text
                  >Create account</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
      password: '',
      loginDialog: true
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
