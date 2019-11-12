import Vue from 'vue'
import Vuetify, { VSnackbar, VBtn, VIcon } from 'vuetify/lib'
import VuetifyToast from 'vuetify-toast-snackbar'
import { Waterfall, WaterfallItem } from 'vue2-waterfall'

Vue.use(Vuetify, {
  components: {
    VSnackbar,
    VBtn,
    VIcon,
    Waterfall,
    WaterfallItem
  }
})

Vue.use(VuetifyToast, {
  x: 'center', // default
  y: 'top', // default
  color: 'info', // default
  icon: 'mdi-information',
  iconColor: '', // default
  classes: ['body-2'],
  timeout: 9000, // default
  dismissable: true, // default
  multiLine: false, // default
  vertical: false, // default
  queueable: false, // default
  showClose: true, // default
  closeText: '', // default
  closeIcon: 'mdi-close', // default
  closeColor: '', // default
  slot: [], // default
  shorts: {
    custom: {
      color: 'purple'
    }
  },
  property: '$toast' // default
})
