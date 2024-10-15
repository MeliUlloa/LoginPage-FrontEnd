// stores/sesionStore.ts
import { defineStore } from 'pinia';
import type { SesionState } from '@/models/Sesion';

export const useSesionStore = defineStore('sesion', {
  state: (): SesionState => ({
    loading: false,
    data: null,
  }),

  actions: {
    update(payload: string, createdAt: Date, refreshAt: Date, expiresAt: Date) {
      this.data = {
        tokenPayload: payload,
        createdAt,
        refreshAt,
        expiresAt,
      };
    },

    setLoading(loading: boolean) {
      this.loading = loading;
    },

    logout() {
      this.data = null;
      this.loading = false;
    }
  }
});
