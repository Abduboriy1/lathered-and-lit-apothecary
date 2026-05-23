import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import router from '@/router'
import App from '@/App.vue'
import './style.css'
import { useCartStore } from '@/stores/cart'

gsap.registerPlugin(ScrollTrigger)

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')

useCartStore().hydrateCart()
