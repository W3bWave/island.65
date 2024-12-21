import './assets/styles/style.scss'
import './assets/styles/output.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


let app = createApp(App)
app.config.globalProperties.Telegram = window.Telegram;
setTimeout(() => {
    if(window.Telegram.WebApp.platform != 'tdesktop' && window.Telegram.WebApp.platform != 'web') window.Telegram.WebApp.requestFullscreen()
        window.Telegram.WebApp.lockOrientation();
        window.Telegram.WebApp.disableVerticalSwipes();
}, 500);


app.use(store).use(router).mount('#app')
