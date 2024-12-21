import './assets/styles/style.scss'
import './assets/styles/output.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


createApp(App).use(store).use(router).mount('#app')
