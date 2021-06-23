import { createApp } from 'vue'
import App from './App.vue'
import VueKinesis from 'vue-kinesis'
import VueSmoothScroll from 'v-smooth-scroll'
import './index.css'

const app = createApp(App)
app.use(VueKinesis)
app.use(VueSmoothScroll)
app.mount('#app')
