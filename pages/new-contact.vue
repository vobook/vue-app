<template>
  <div>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="form.name" label="Name"></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.first_name"
              label="First name"
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
                v-model="form.birthday"
                no-title
                ref="birthdayCalPicker"
                :max="new Date().toISOString().substr(0, 10)"
                @input="birthdayCal = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col v-for="(prop, i) in form.fields" :key="i" cols="12" md="4">
            <v-text-field
              v-model="form.fields[i].value"
              :label="getPropLabel(prop)"
              :prepend-icon="propTypes()[prop.type].icon"
              :value="prop.value"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-btn color="primary" text dark @click.stop="propDialog = true"
              >Add another prop...</v-btn
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
                  <v-text-field label="Email*" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Password*"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    :items="propTypes()"
                    item-text="name"
                    item-value="type"
                    label="Type"
                    required
                  >
                    <template slot="selection" slot-scope="data">
                      <v-flex xs2>
                        <v-icon>{{ data.item.icon }}</v-icon>
                      </v-flex>
                      <v-flex class="ml-1">
                        {{ data.item.name }}
                      </v-flex>
                    </template>

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
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="propDialog = false"
              >Save</v-btn
            >
            <v-btn text color="secondary lighten-1" @click="propDialog = false"
              >Cancel</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-footer padless fixed>
      <v-row class="primary lighten-2">
        <v-col cols="12" class="text-center">
          <v-btn>
            Save contact
          </v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        first_name: '',
        last_name: '',
        email: '',
        birthday: '',
        fields: [
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
      propDialog: true
    }
  },

  watch: {
    birthdayCal(val) {
      val &&
        setTimeout(() => (this.$refs.birthdayCalPicker.activePicker = 'YEAR'))
    }
  },

  beforeMount() {},

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

      console.log(prop)

      console.log(this.propTypes())

      return this.propTypes()[prop.type].name
    },
    propTypes() {
      return this.$store.state.contactPropertyTypes
    }
  }
}
</script>
