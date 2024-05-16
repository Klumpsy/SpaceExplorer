import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faR } from '@fortawesome/free-solid-svg-icons'
import { faB } from '@fortawesome/free-solid-svg-icons'

library.add(fas, faR, faB)

const app = createApp(App)
app.use(router)
app.mount('#app')
app.component('font-awesome-icon', FontAwesomeIcon)
