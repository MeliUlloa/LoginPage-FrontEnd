// types/sesion.ts
export interface Sesion {
    tokenPayload: string;
    createdAt: Date;
    refreshAt: Date;
    expiresAt: Date;
  }
  
  export interface SesionState {
    loading: boolean;
    data: Sesion | null;
  }
  