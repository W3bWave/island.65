import './assets/styles/style.scss'
import './assets/styles/output.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


let app = createApp(App)
app.config.globalProperties.Telegram = window.Telegram;

if(window.Telegram.WebApp.platform == "ios" || window.Telegram.WebApp.platform == "android"){
    window.Telegram.WebApp.requestFullScreen()
}

app.use(store).use(router).mount('#app')
