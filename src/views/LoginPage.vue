<!-- Este archivo contiene la página de inicio de sesión. 
Es una vista completa que muestra el formulario de login. -->

<template>
  <div class="wrapper">
    <LoginForm />
    <!-- <LoginForm />: Aquí se incluye un componente que representa el formulario de inicio de sesión. Lo definimos a continuación. -->
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
</script>

<style scoped></style>
