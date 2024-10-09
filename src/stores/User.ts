import { defineStore } from 'pinia'
import type { User } from '@/models/User'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null
  }),
  actions: {
    setUser(user: User) {
      this.user = user
    }
  }
})
