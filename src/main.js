/**
 * Main entry point for the Vue application
 * Initializes Vue, Pinia store, and router
 */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/router.js'

const app = createApp(App)

// Initialize Pinia store
app.use(createPinia())

// Initialize router
app.use(router)

// Mount app to DOM
app.mount('#app')

