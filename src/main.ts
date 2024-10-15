import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useAuthStore } from './stores/authStore';
import { fakeBackend } from './helpers/fakeBackend';
import './assets/styles.css';

import App from './App.vue';
import router from './router';

// Simulación de backend para entornos de desarrollo o pruebas
fakeBackend();

// Función asíncrona para iniciar la aplicación
startApp();

async function startApp() {
    const app = createApp(App);  // Crear la instancia de la app

    app.use(createPinia());  // Configurar Pinia como el store de estado
    app.use(router);  // Configurar el router para la navegación

    try {
        const authStore = useAuthStore();  // Instanciar la tienda de autenticación
        await authStore.refreshToken();  // Intentar refrescar el token de autenticación
    } catch (error) {
        console.warn('No hay datos en la autenticación para el usuario');  // Avisar si no hay datos de autenticación
        console.info('Redirigido a la página de Login');  // Informar sobre la redirección
        router.push('/login');  // Redirigir al login
    }

    app.mount('#app');  // Montar la app en el elemento con ID '#app'
}

