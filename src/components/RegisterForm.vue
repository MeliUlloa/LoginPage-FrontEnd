<template>
    <div class="form-box">
      <h2>Register</h2>
  
      <!--@submit.prevent evita la recarga de la página y llamando a la función-->
      <form @submit.prevent="register" id="register-form">
        <div class="input-group">
          <input type="text" v-model="username" placeholder="Username" required />
          <input type="email" v-model="email" placeholder="Email" required />
          <input type="password" v-model="password" placeholder="Password" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useUserStore } from '@/stores/userStore'
  import { useRouter } from 'vue-router'
  
  const userStore = useUserStore()
  const router = useRouter()
  
  const username = ref('')
  const email = ref('')
  const password = ref('')
  
  const register = () => {
    const newUser = {
      user: username.value, // Guardamos el nombre de usuario
      password: password.value,
      remember: false // Puedes manejar esto si deseas
    }
  
    console.log('Registering with: ', newUser)
  
    // Guardamos el usuario en el store
    userStore.setUser(newUser)
  
    // Redirigimos a la página de inicio
    router.push('/home')
  }
  </script>

  <style scoped>
 .form-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
    margin-bottom: 20px;
    color: #333;
}

.input-group {
    display: flex;
    flex-direction: column;
    width: 100%;
}

input[type="text"],
input[type="email"],
input[type="password"] {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 20px;
}

button {
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #218838;
}
</style>
  
