// Este archivo define las rutas de la aplicación. Aquí especificas qué componentes se cargarán para cada ruta.
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import HomeView from '@/views/HomeView.vue'

// Define las rutas de la aplicación.
// En este caso, / carga la página de inicio de sesión
// y /home carga la vista principal después de iniciar sesión.

const routes = [
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/', name: 'Home', component: HomeView }
]

// Crea una instancia de Vue Router.
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
