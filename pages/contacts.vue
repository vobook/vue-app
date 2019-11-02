<template>
  <v-layout>
    <v-container>
      <Waterfall :resizable="true" :gutterWidth="5" :gutterHeight="5">
        <WaterfallItem v-for="elem in elems" :key="elem.id" :width="300">
          <v-card outlined tile>
            <v-card-title class="blue white--text">
              <span class="headline">{{ elem.name }}</span>
              <v-spacer></v-spacer>
              <v-menu bottom left>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item
                    v-for="(act, i) in actions"
                    :key="i"
                    @click="act.handler(elem.id)"
                  >
                    <v-list-item-title>{{ act.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>

            <v-card-text>
              <v-list>
                <template v-for="item in elem.props">
                  <v-list-item :key="item.id" v-if="isTypePrimary(item.type)">
                    <v-list-item-content>
                      <v-list-item-subtitle class="text-left"
                        ><v-icon>{{ propTypeIcon(item.type) }}</v-icon>
                        {{ item.name }} ({{ item.type }})</v-list-item-subtitle
                      >
                      <v-list-item-title
                        v-html="item.value"
                        class="text-left"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </WaterfallItem>
      </Waterfall>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      elems: null,
      actions: [
        {
          title: 'Delete',
          handler: (id) => {}
        }
      ],
      propsIcons: [
        'mdi-other', // none
        'mdi-phone', // 1 PersonalPhone
        'mdi-phone', // 2 WorkPhone
        'mdi-email', // 3 PersonalEmail
        'mdi-email', // 4 WorkEmail
        'mdi-phone', // 5 Phone
        'mdi-email', // 6 Email
        'mdi-address', // 7 Address
        'mdi-facebook', // 8 Facebook
        'mdi-twitter', // 9 Twitter
        'mdi-github', // 10 Github
        'mdi-whatsapp', // 11 WhatsApp
        'mdi-telegram', // 12 Telegram
        'mdi-link', // 13 Telegram
        'mdi-note' // 14 Telegram
      ]
    }
  },

  beforeMount() {
    this.loadContacts()
  },

  methods: {
    async loadContacts() {
      try {
        await this.$axios.get('/contacts/').then((resp) => {
          this.elems = resp.data.data
        })
      } catch (e) {
        // this.$toast.error(e.response.data.error)
      }
    },

    isTypePrimary(t) {
      const types = [1, 2, 3, 5, 6]
      return types.includes(t)
    },

    propTypeIcon(t) {
      return this.propsIcons[t]
    }
  }
}
</script>
