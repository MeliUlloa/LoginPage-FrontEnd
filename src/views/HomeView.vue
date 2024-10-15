<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { useAuthStore } from '@/stores/authStore';

// Obtenemos el estado del usuario desde el store
const user = useUserStore().user;

// Obtenemos el store de autenticación para gestionar el logout
const authStore = useAuthStore();

// Función para cerrar sesión
function logout() {
  authStore.logout();
}
</script>

<!-- Esta es la vista que se carga una vez que el usuario ha iniciado sesión. -->
<template>
  <div class="wrapper">
    <h1>Hola: {{ user.username }}</h1>
    <button @click="logout">Logout</button>
  </div>
</template>
