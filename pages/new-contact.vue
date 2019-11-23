<template>
  <v-card elevation="2">
    <v-form id="saveContact" method="post" @submit.prevent="saveContact">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.first_name"
              label="First name"
              autofocus
              large
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.middle_name"
              label="Middle name"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.last_name"
              label="Last name"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field v-model="form.name" label="Nickname"></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-menu
              ref="birthdayCal"
              v-model="birthdayCal"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="form.birthday"
                  label="Birthday"
                  readonly
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  @blur="form.birthday = parseDate(form.birthday)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="birthdayCalPicker"
                v-model="form.birthday"
                no-title
                :max="new Date().toISOString().substr(0, 10)"
                @input="birthdayCal = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col v-for="(prop, i) in form.props" :key="i" cols="12" md="4">
            <v-text-field
              v-model="form.props[i].value"
              :label="getPropLabel(prop)"
              :prepend-icon="getPropIcon(prop.type)"
              :value="prop.value"
              append-icon="mdi-close"
              @click:append="removeProp(i)"
              @click:prepend="editProp(i)"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="text-center">
            <v-btn color="primary" text @click.stop="addProp()"
              >Add property</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-row justify="center">
      <v-dialog v-model="propDialog" max-width="400px">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="activeProp.type"
                    :items="propTypes()"
                    item-text="name"
                    item-value="type"
                    label="Type"
                    required
                    :prepend-icon="
                      this.$store.getters.getContactPropByType(activeProp.type)
                        .icon
                    "
                    @change="setActivePropName"
                  >
                    <template slot="item" slot-scope="data">
                      <v-flex xs2>
                        <v-icon>{{ data.item.icon }}</v-icon>
                      </v-flex>
                      <v-flex class="ml-1">
                        {{ data.item.name }}
                      </v-flex>
                    </template>
                  </v-select>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="activeProp.name"
                    label="Label"
                    type="text"
                    required
                    :prepend-icon="
                      this.$store.getters.getContactPropByType(activeProp.type)
                        .icon
                    "
                    @change="setActivePropCustomName"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="activeProp.value"
                    label="Value"
                    @keyup.enter="saveActiveProp()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="saveActiveProp"
              >Add</v-btn
            >
            <v-btn text color="secondary lighten-1" @click="propDialog = false"
              >Cancel</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-footer padless fixed app>
      <v-row class="primary lighten-2">
        <v-col cols="12" class="text-center">
          <v-btn type="submit" form="saveContact"
            >{{ !id ? 'Save new contact' : 'Update contact' }}
          </v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </v-card>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      // this component used to create and update contacts
      // if id is null, then use form for creating contact
      // otherwise for editing
      id: null,
      form: {
        name: '',
        first_name: '',
        last_name: '',
        email: '',
        birthday: '',
        props: [
          {
            type: 2,
            name: '',
            value: ''
          },
          {
            type: 4,
            name: '',
            value: ''
          }
        ]
      },
      birthdayCal: false,
      propDialog: false,
      activeProp: {
        propIdx: null,
        type: 1,
        name: this.$store.getters.getContactPropByType(1).name,
        customName: '',
        value: ''
      }
    }
  },

  watch: {
    birthdayCal(val) {
      val &&
        setTimeout(() => (this.$refs.birthdayCalPicker.activePicker = 'YEAR'))
    }
  },

  mounted() {},

  beforeMount() {
    const id = this.$route.params.id
    if (!id) {
      return
    }

    this.id = id
    this.fetchContact(id)
  },

  methods: {
    parseDate(date) {
      if (!date) return null

      // const [month, day, year] = date.split('-')
      // return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      return date
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

    // if user entered its own name for type
    // then use it
    //  otherwise use type default name
    setActivePropName() {
      if (this.activeProp.customName === '') {
        this.activeProp.name = this.$store.getters.getContactPropByType(
          this.activeProp.type
        ).name
        return
      }

      this.activeProp.name = this.activeProp.customName
    },

    // if active prop name is not same as name of type
    // set it as custom name
    // this is needed to check for user input to keep custom name across types (when type changed)
    // @see setActivePropName
    setActivePropCustomName() {
      if (
        this.$store.getters.getContactPropByType(this.activeProp.type).name !==
        this.activeProp.name
      ) {
        this.activeProp.customName = this.activeProp.name
      }
    },

    addProp(i) {
      this.activeProp.propIdx = null
      this.activeProp.name = ''
      this.activeProp.value = ''
      this.propDialog = true
    },

    removeProp(i) {
      this.form.props.splice(i, 1)
    },

    editProp(i) {
      const prop = this.form.props[i]
      this.activeProp.propIdx = i
      this.activeProp.type = prop.type
      this.activeProp.name = prop.name
      this.activeProp.value = prop.value
      this.propDialog = true
    },

    saveActiveProp() {
      this.propDialog = false
      // new prop
      if (this.activeProp.propIdx === null) {
        this.form.props.push({
          type: this.activeProp.type,
          name: this.activeProp.name,
          value: this.activeProp.value
        })

        // keep type for next
        // reset name and value
        this.activeProp.name = this.$store.getters.getContactPropByType(
          this.activeProp.type
        ).name
        this.activeProp.value = ''
      } else {
        const i = this.activeProp.propIdx
        const prop = this.form.props[i]
        prop.type = this.activeProp.type
        prop.name = this.activeProp.name
        prop.value = this.activeProp.value
        this.form.props[i] = prop
      }
    },

    async saveContact() {
      if (this.id === null) {
        try {
          await this.$axios.$post('/contacts/', this.form).then((resp) => {
            this.id = resp.id
            this.$notify('New contact added')
          })
        } catch (e) {
          this.$notify({
            type: 'error',
            title: 'Failed to save contact',
            text: e.response.data.error
          })
        }
      } else {
        try {
          await this.$axios
            .$put('/contacts/' + this.id + '/', this.form)
            .then((resp) => {
              this.$notify('Contact updated')
            })
        } catch (e) {
          this.$notify({
            type: 'error',
            title: 'Failed to update contact',
            text: e.response.data.error
          })
        }
      }
    },

    async fetchContact(id) {
      try {
        await this.$axios.$get('/contacts/' + id + '/').then((resp) => {
          if (resp.birthday !== null) {
            resp.birthday = moment(resp.birthday).format('YYYY-MM-DD')
          }
          this.form = resp
        })
      } catch (e) {
        this.$notify({
          type: 'error',
          title: 'Failed to load contacts',
          text: e.response.data.error
        })
      }
    }
  }
}
</script>
