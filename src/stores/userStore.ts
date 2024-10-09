// Aquí es donde se maneja el estado global de los datos del usuario con Pinia.
// Se crea un "store" que mantiene la información del usuario.

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/models/User'

//setUser(): Guarda los datos del usuario cuando se inicia sesión.
export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  //user.value: Mantiene los datos del usuario en la memoria global.
  function setUser(newUser: User) {
    user.value = newUser
  }

  return { user, setUser }
})
