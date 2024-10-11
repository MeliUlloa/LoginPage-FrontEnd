import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/styles.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia()) ////configura Pinia como el sistema de gestión de estado global.
app.use(router)//configura el enrutador para manejar las rutas de la aplicación.

app.mount('#app')////monta la aplicación en el elemento con el ID #app del archivo index.html. Aquí es donde Vue controla la interfaz de usuario.
