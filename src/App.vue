<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/"></RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
