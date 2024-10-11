<!-- Este archivo contiene la página de inicio de sesión. 
Es una vista completa que muestra el formulario de login. -->

<template>
  <div class="wrapper">
    <div class="container">
      <div class="bx sign-in">
        <LoginForm />
    <!-- <LoginForm />: Aquí se incluye un componente que representa el formulario de inicio de sesión. Lo definimos a continuación. -->
      </div>
    </div>
  </div>

    
</template>

<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
</script>

<style scoped>
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container {
    margin-bottom: 20px;
}

.form-bx {
    display: flex;
    justify-content: center;
}
</style>
