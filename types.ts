export interface iBook {
  id: string;
  category: string;
  description: string;
  name: string;
  price: string;
}

export enum AppStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  FAILED = 'failed',
}

export type Status = AppStatus.FAILED | AppStatus.IDLE | AppStatus.LOADING;
