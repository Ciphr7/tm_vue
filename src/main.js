import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import x5GMaps from 'x5-gmaps'
import {apiKey} from './components/googleApiKey'
// Option 1: Just your key
Vue.use(x5GMaps, apiKey)
// Option 2: With libraries
Vue.use(x5GMaps, { key: apiKey, libraries: ['places'] })

Vue.config.productionTip = false

new Vue({
  
  vuetify,
  render: h => h(App),
 
})

.$mount('#app')
