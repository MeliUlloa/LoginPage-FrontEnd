<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<!--Enrutamiento funcionando y enlaces para navegar entre el formulario de registro e ingreso.-->
<template>
  <div id="app">
    <!--e usa para crear enlaces de navegación que permiten cambiar entre el formulario de Login y Register. Esto permite la navegación interna sin recargar la página.-->
    <nav>
      <RouterLink to="/">Login</RouterLink>
      <RouterLink to="/home">Home</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
    </nav>

    <router-view />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #007bff;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.nav-link {
  color: white;
  text-decoration: none;
  margin: 0 15px;
  font-size: 1.2rem;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #ffc107;
}

.nav-link:active {
  color: #ff5722; /* Un color diferente cuando se hace clic en el enlace */
}
</style>
