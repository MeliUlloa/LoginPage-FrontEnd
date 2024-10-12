<!-- Esta es la vista que se carga una vez que el usuario ha iniciado sesión. -->

<template>
  <div>
    <!--{{ userStore.user?.user }}: Muestra el nombre del usuario que ha iniciado sesión.-->
    <h1>Bienvenido, {{ userStore.user?.username }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>
