<template>
    <div class="wrapper">
        <div class="form signup-form">
      <RegisterForm />
      <!-- Aquí se incluye un componente que representa el formulario de registro. -->
     </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import RegisterForm from '@/components/RegisterForm.vue'
  </script>
  
  <style scoped>
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #e9ecef;
}

.form {
    display: flex;
    justify-content: center;
}
</style>