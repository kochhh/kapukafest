import { createApp } from 'vue'
import App from './App.vue'
import VueKinesis from 'vue-kinesis'
import './index.css'

import firebase from 'firebase/app'

firebase.initializeApp({
  apiKey: "AIzaSyC88falSCZUHaVrlovuoQSsiAvA6KaETRA",
  authDomain: "kapukafest-abe4e.firebaseapp.com",
  projectId: "kapukafest-abe4e",
  storageBucket: "kapukafest-abe4e.appspot.com",
  messagingSenderId: "762189318212",
  appId: "1:762189318212:web:86811581074a75151a9411",
  measurementId: "G-36BGFCM65W"
})

const app = createApp(App)
app.use(VueKinesis)
app.mount('#app')
