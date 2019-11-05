<template>
  <v-layout>
    <v-container>
      <Waterfall :resizable="true" :gutter-width="5" :gutter-height="5">
        <WaterfallItem v-for="elem in elems" :key="elem.id" :width="300">
          <v-card tile outlined>
            <v-card-title dark>
              <span>{{ elem.name }}</span>
              <v-spacer></v-spacer>
              <v-menu bottom left>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon dark>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list dark>
                  <v-list-item
                    v-for="(act, i) in actions"
                    :key="i"
                    @click="act.handler(elem.id)"
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
                <template v-for="item in elem.props">
                  <v-list-item v-if="isTypePrimary(item.type)" :key="item.id">
                    <v-list-item-content>
                      <v-list-item-subtitle class="text-left"
                        ><v-icon>{{ propTypeIcon(item.type) }}</v-icon>
                        {{ item.name }}</v-list-item-subtitle
                      >
                      <v-list-item-title class="text-left">{{
                        item.value
                      }}</v-list-item-title>
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
          title: 'Edit',
          icon: 'mdi-pencil',
          handler: (id) => {
            console.log('Editing: ' + id)
          }
        },
        {
          title: 'Delete',
          icon: 'mdi-delete',
          handler: (id) => {
            console.log('Deleting: ' + id)
          }
        }
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
        this.$toast.error(e.response.data.error)
      }
    },

    isTypePrimary(t) {
      const types = [2, 3, 4, 6, 7]
      return types.includes(t)
    },

    propTypeIcon(t) {
      return this.$store.state.contactPropertyTypes[t].icon
    }
  }
}
</script>
