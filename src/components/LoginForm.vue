<!-- Este es el componente que representa el formulario de inicio de sesión. -->

<!--v-model="user": Utiliza dos enlaces de datos para capturar la información del usuario-->

<!--handleSubmit(): Este método maneja el envío del formulario, guarda los datos en el estado global 
 (Pinia) y redirige a la página de inicio.-->
<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <h1>Login</h1>
    <div class="input-bx">
      <input v-model="user" type="text" placeholder="Usuario" required />
      <ion-icon class="icon" name="person-circle"></ion-icon>
    </div>
    <div class="input-bx">
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <ion-icon class="icon" name="lock-closed"></ion-icon>
    </div>
    <div class="remember-forgot">
      <label><input v-model="remember" type="checkbox" /> Recordarme</label>
      <a href="#">Olvidaste tu contraseña</a>
    </div>
    <button type="submit" class="btn">Ingresar</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const user = ref('')
const password = ref('')
const remember = ref(false)

function handleSubmit() {
  console.log(
    `Usuario: ${user.value}, Contraseña: ${password.value}, Recordarme: ${remember.value}`
  )
}
</script>

<style scoped></style>
