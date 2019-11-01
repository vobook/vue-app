<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card outlined>
              <v-card-text>
                <p class="display-1 text--primary text-center">
                  create account
                </p>
                <v-form method="post" @submit.prevent="login">
                  <v-text-field
                    label="Your email address"
                    name="email"
                    prepend-icon="mdi-email"
                    type="text"
                    autofocus
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    label="Password for your account"
                    name="password"
                    prepend-icon="mdi-key"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary"
                  >&nbsp;&nbsp;&nbsp;Submit&nbsp;&nbsp;&nbsp;</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
            <p></p>
            <p class="text-center">
              <v-btn :nuxt="true" to="/login" outlined small>Login</v-btn>
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  auth: false,
  // middleware: 'guest',
  layout: 'simple',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      error: null
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data.message
      }
    }
  }
}
</script>

<style>
body,
html {
  background-color: silver !important;
}
</style>
