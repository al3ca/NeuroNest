import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter, RouterView } from 'vue-router'
import router from './router/router.js'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')
