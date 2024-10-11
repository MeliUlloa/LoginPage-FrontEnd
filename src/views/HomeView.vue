<!-- Esta es la vista que se carga una vez que el usuario ha iniciado sesión. -->

<template>
  <div class="wrapper">
    <!--{{ userStore.user?.user }}: Muestra el nombre del usuario que ha iniciado sesión.-->
    <h1>Bienvenido, {{ userStore.user?.user }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

</script>
<style scoped>
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f8f9fa;
    text-align: center;
}

h1 {
    color: #333;
}
</style>