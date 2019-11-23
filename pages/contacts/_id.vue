<template>
  <div>
    <v-card-title class="display-3">
      {{ elem.name }}
      <v-subheader v-if="showFullName()" class="title">{{
        fullName()
      }}</v-subheader>
    </v-card-title>
    <v-card elevation="2">
      <v-card-text>
        <v-row>
          <v-col v-if="elem.birthday !== null" cols="12" md="4">
            <v-list-item-content>
              <v-list-item-subtitle class="text-left"
                ><v-icon>mdi-cake-variant</v-icon>Birthday</v-list-item-subtitle
              >
              <v-list-item-title class="text-left">{{
                formatBirthdayDate(elem.birthday)
              }}</v-list-item-title>
            </v-list-item-content>
          </v-col>
          <template v-for="item in elem.props">
            <v-col v-if="item.value !== ''" :key="item.id" cols="12" md="4">
              <v-list-item-content>
                <v-list-item-subtitle class="text-left"
                  ><v-icon>{{ propTypeIcon(item.type) }}</v-icon>
                  {{ propName(item) }}</v-list-item-subtitle
                >
                <v-list-item-title class="text-left">
                  {{ item.value }}</v-list-item-title
                >
              </v-list-item-content>
            </v-col>
          </template>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="primary" depressed :to="'/edit-contact/' + elem.id"
          ><v-icon left>mdi-pencil</v-icon> Edit</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          v-if="elem.deleted_at === null"
          color="error"
          depressed
          @click="deleteContact()"
          ><v-icon left>mdi-delete</v-icon> Delete</v-btn
        >
        <v-btn v-else color="success" depressed @click="restoreContact()"
          ><v-icon left>mdi-delete-restore</v-icon>Restore</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      id: null,
      elem: {}
    }
  },
  beforeMount() {
    const id = this.$route.params.id
    if (!id) {
      return
    }

    this.id = id
    this.fetchContact(id)
  },

  methods: {
    formatBirthdayDate(d) {
      if (d === null) {
        return 'unknown'
      }
      return moment(d).format('Do MMMM, YYYY')
    },

    getPropLabel(prop) {
      if (prop.name !== '') {
        return prop.name
      }

      return this.$store.getters.getContactPropByType(prop.type).name
    },

    getPropIcon(t) {
      return this.$store.getters.getContactPropByType(t).icon
    },

    propTypes() {
      return this.$store.state.contactPropertyTypes
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

    showFullName() {
      return this.elem.first_name + ' ' + this.elem.last_name !== this.elem.name
    },

    fullName() {
      return (
        this.elem.first_name +
        ' ' +
        this.elem.middle_name +
        ' ' +
        this.elem.last_name
      )
    },

    async fetchContact(id) {
      try {
        await this.$axios.$get('/contacts/' + id + '/').then((resp) => {
          if (resp.birthday !== null) {
            resp.birthday = moment(resp.birthday).format('YYYY-MM-DD')
          }
          this.elem = resp
        })
      } catch (e) {
        this.$notify({
          type: 'error',
          title: 'Failed to load contact',
          text: e.response.data.error
        })
      }
    },

    async deleteContact() {
      try {
        await this.$axios.$put('/trash-contacts/', [this.id]).then((resp) => {
          this.elem.deleted_at = moment().format()
          this.$notify('Contact "' + this.elem.name + '" moved to trash')
        })
      } catch (e) {
        this.$notify({
          type: 'error',
          title: 'Failed to delete contact',
          text: e.response.data.error
        })
      }
    },

    async restoreContact() {
      try {
        await this.$axios.$put('/restore-contacts/', [this.id]).then((resp) => {
          this.elem.deleted_at = null
          this.$notify('Contact "' + this.elem.name + '" restored')
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
