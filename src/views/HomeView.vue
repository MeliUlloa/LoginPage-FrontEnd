<script setup>
// Importar las stores necesarias desde Pinia
import { useAuthStore } from "@/stores/authStore";
import { useSesionStore } from "@/stores/sesionStore";
import { useUserStore } from "@/stores/userStore";

// Acceso a las stores
const authStore = useAuthStore();
const sesionStore = useSesionStore();
const userStore = useUserStore();

// Función para formatear fechas/timestamps a hora local
const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};

// Función para cerrar sesión
const logout = () => {
  authStore.logout();
};

// Función para crear nuevo usuario (placeholder)
const createUser = () => {
  alert("Funcionalidad para crear un nuevo usuario");
};
</script>

<!-- Esta es la vista que se carga una vez que el usuario ha iniciado sesión. -->
<template>
  <div class="home">
    <!-- Verificamos si el usuario está autenticado -->
    <div v-if="authStore.auth.data">
      <h1>Bienvenido, {{ authStore.auth.data.username }}</h1>
      <p><strong>Rol:</strong> {{ authStore.auth.data.isAdmin }}</p>

      <!-- Mostrar detalles del token desde sesionStore -->
      <div class="session-info">
        <h2>Información del token</h2>
        <p><strong>Payload del token:</strong> {{ sesionStore.tokenPayload }}</p>
        <p><strong>Creado:</strong> {{ formatTimestamp(sesionStore.tokenCreationTime) }}</p>
        <p><strong>Expira:</strong> {{ formatTimestamp(sesionStore.tokenExpirationTime) }}</p>
        <p><strong>Se refrescará en:</strong> {{ formatTimestamp(sesionStore.tokenRefreshTime) }}</p>
      </div>

      <!-- Listado de usuarios desde userStore -->
      <div class="user-list">
        <h2>Listado de usuarios</h2>
        <ul>
          <li v-for="user in userStore.user" :key="user.id">{{ user.username }} - {{ user.email }}</li>
        </ul>
        <!-- Mostrar botón para crear nuevo usuario solo si es admin -->
        <div v-if="authStore.auth.data.isAdmin === 'true'">
          <button @click="createUser">Crear nuevo usuario</button>
        </div>
      </div>

      <!-- Botón para cerrar sesión -->
      <button @click="logout">Cerrar sesión</button>
    </div>

    <!-- Mensaje si no está autenticado -->
    <div v-else>
      <h1>No has iniciado sesión</h1>
      <router-link to="/login">Iniciar sesión</router-link>
    </div>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  margin: 20px;
}

.session-info {
  margin-top: 20px;
}

.user-list {
  margin-top: 20px;
}

button {
  background-color: #4CAF50; /* Verde */
  color: white;
  padding: 10px 20px;
  margin-top: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}
</style>
