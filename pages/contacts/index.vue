<template>
  <v-layout>
    <v-snackbar v-model="snack.show" :timeout="5000" color="success">
      {{ snack.text }}
      <v-btn text @click="restoreContact(snack.elemIdx)">
        Undo
      </v-btn>
    </v-snackbar>
    <v-container>
      <Waterfall :resizable="true" :gutterWidth="10" :gutterHeight="10">
        <template v-for="(elem, i) in elems">
          <WaterfallItem
            v-if="elem.deleted_at === null"
            :key="elem.id"
            :width="300"
          >
            <v-hover v-slot:default="{ hover }">
              <v-card
                :class="hover ? 'contactCardHovered' : 'contactCard'"
                nuxt
                :to="'contacts/' + elem.id"
              >
                <v-card-title class="contactCardTitle">
                  <span>{{ elem.name }}</span>
                  <v-menu bottom left transition="fade-transition">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        icon
                        @click.prevent
                        v-on="on"
                        absolute
                        top
                        right
                        class="contactActionsBtn"
                      >
                        <v-icon dark>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>

                    <v-list dark color="primary">
                      <v-list-item
                        v-for="(act, x) in actions"
                        :key="x"
                        @click="act.handler(i)"
                      >
                        <v-list-item-title
                          ><v-icon>{{ act.icon }}</v-icon
                          >{{ act.title }}</v-list-item-title
                        >
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-item v-if="hasBirthday(elem)">
                      <v-list-item-content>
                        <v-list-item-subtitle class="text-left"
                          ><v-icon>mdi-cake-variant</v-icon
                          >Birthday</v-list-item-subtitle
                        >
                        <v-list-item-title class="text-left">{{
                          formatBirthdayDate(elem)
                        }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <template v-for="item in elem.props">
                      <v-list-item
                        v-if="isTypePrimary(item.type) && item.value !== ''"
                        :key="item.id"
                      >
                        <v-list-item-content>
                          <v-list-item-subtitle class="text-left"
                            ><v-icon>{{ propTypeIcon(item.type) }}</v-icon>
                            {{ propName(item) }}</v-list-item-subtitle
                          >
                          <v-list-item-title class="text-left">{{
                            item.value
                          }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-hover>
          </WaterfallItem>
        </template>
      </Waterfall>
    </v-container>
  </v-layout>
</template>

<script>
import moment from 'moment'
import { Waterfall, WaterfallItem } from 'vue2-waterfall'
import mixins from './mixins.js'

export default {
  components: {
    Waterfall,
    WaterfallItem
  },
  data() {
    return {
      elems: null,
      snack: {
        show: false,
        text: '',
        elemIdx: null
      },
      actions: [
        {
          title: 'Edit',
          icon: 'mdi-pencil',
          handler: (idx) => {
            const elem = this.elems[idx]
            this.$router.push('/edit-contact/' + elem.id)
          }
        },
        {
          title: 'Delete',
          icon: 'mdi-delete',
          handler: async (idx) => {
            const elem = this.elems[idx]
            try {
              await this.$axios
                .$put('/trash-contacts/', [elem.id])
                .then((resp) => {
                  this.elems[idx].deleted_at = moment().format()
                  this.snack.text = 'Contact "' + elem.name + '" moved to trash'
                  this.snack.elemIdx = idx
                  this.snack.show = true
                })
            } catch (e) {
              this.$notify({
                type: 'error',
                title: 'Failed to delete contact',
                text: e.response.data.error
              })
            }
          }
        }
      ]
    }
  },

  beforeMount() {
    this.hasBirthday = mixins.hasBirthday
    this.formatBirthdayDate = mixins.formatBirthdayDate
    this.loadContacts()
  },

  methods: {
    async loadContacts() {
      try {
        await this.$axios.$get('/contacts/').then((resp) => {
          this.elems = resp.data
        })
      } catch (e) {
        this.$notify({
          type: 'error',
          title: 'Failed to load contacts',
          text: e.response.data.error
        })
      }
    },

    isTypePrimary(t) {
      const types = [2, 3, 4, 6, 7]
      return types.includes(t)
    },

    propTypeIcon(t) {
      return this.$store.getters.getContactPropByType(t).icon
    },

    propName(prop) {
      if (prop.name === '') {
        return this.$store.getters.getContactPropByType(prop.type).name
      }

      return prop.name
    },

    async restoreContact(idx) {
      this.snack.show = false
      const elem = this.elems[idx]
      try {
        await this.$axios.$put('/restore-contacts/', [elem.id]).then((resp) => {
          this.elems[idx].deleted_at = null
          this.$notify('Contact "' + elem.name + '" restored')
        })
      } catch (e) {
        this.$notify({
          type: 'error',
          title: 'Failed to restore contact',
          text: e.response.data.error
        })
      }
    }
  }
}
</script>

<style>
.contactCard {
  box-shadow: inset 0 0 0 2px white;
}
.contactCardHovered {
  box-shadow: inset 0 0 0 2px #1e88e5, 0 5px 10px rgba(0, 0, 0, 0.2);
}

.v-card__text {
  padding: 2px !important;
}

.contactCardTitle {
  padding: 10px 36px 0 10px !important;
}

.contactActionsBtn {
  top: 5px !important;
  right: 0 !important;
}
</style>
