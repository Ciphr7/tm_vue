import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import x5GMaps from 'x5-gmaps'
// Option 1: Just your key
Vue.use(x5GMaps, '')
// Option 2: With libraries
Vue.use(x5GMaps, { key: '', libraries: ['places'] })

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
