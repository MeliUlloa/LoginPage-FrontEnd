// Store de Pinia para manejar la autenticación del usuario

import { defineStore } from "pinia";
import type { User } from "@/models/User";  // Importamos el modelo de Usuario
import { fetchWrapper } from "@/helpers/fetchWrapper";  // Importamos el fetchWrapper para hacer peticiones HTTP
import router from "@/router";

// Base URL para las peticiones relacionadas con usuarios (se obtiene de las variables de entorno)
const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore({
    id: "auth",  // ID único para este store de Pinia
    state: () => ({
        // Estado inicial de autenticación
        auth: {
            loading: false,  // Indicador de si una operación de autenticación está en proceso
            data: null as User | null,  // Aquí se almacena el usuario autenticado, o null si no está autenticado
            refreshTokenTimeout: null as number | null  // Almacena el tiempo límite del refresh token
        }
    }),

    actions: {
        // Acción para iniciar sesión
        async login(username: string, password: string) {
            // Autentica al usuario y guarda los datos en el estado
            this.auth.data = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password }, { credentials: 'include' });
            // Inicia el temporizador para renovar el token automáticamente
            this.startRefreshTokenTimer();
        },
        
        // Acción para cerrar sesión
        logout() {
            // Llamamos a la API para revocar el token del usuario, enviando cookies para incluir el refresh token
            fetchWrapper.post(`${baseUrl}/revoke-token`, {}, { credentials: 'include' });
            this.stopRefreshTokenTimer();
            this.auth.data = null;
            router.push({ name: '/' });  // Redirigir al login
        },

        // Acción para refrescar el token
        async refreshToken() {
            // Solicita un nuevo token y actualiza el estado
            this.auth.data = await fetchWrapper.post(`${baseUrl}/refresh-token`, {}, { credentials: 'include' });
            this.startRefreshTokenTimer();  // Reinicia el temporizador
        },

        // Iniciar el temporizador para renovar el token antes de que expire
        startRefreshTokenTimer() {
            if (!this.auth.data || !this.auth.data.jwtToken) return;

            // Decodificar el token JWT para obtener el tiempo de expiración
            const jwtBase64 = this.auth.data.jwtToken.split('.')[1];
            const decodedJwtToken = JSON.parse(atob(jwtBase64));

            // Calcular cuánto tiempo queda antes de que el token expire y establecer el timeout para renovarlo
            const expires = new Date(decodedJwtToken.exp * 1000);
            const timeout = expires.getTime() - Date.now() - (60 * 1000);  // 1 minuto antes de expirar

            // Establecer el temporizador para renovar el token
            this.auth.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
        },

        // Detener el temporizador de renovación de token
        stopRefreshTokenTimer() {
            if (this.auth.refreshTokenTimeout) {
                clearTimeout(this.auth.refreshTokenTimeout);
                this.auth.refreshTokenTimeout = null;
            }
        }
    }
});

