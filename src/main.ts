import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import router from '@/router'
import App from '@/App.vue'
import './style.css'

gsap.registerPlugin(ScrollTrigger)

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
