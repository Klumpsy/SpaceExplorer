/// <reference types="vite/client" />
declare global {
    const process: {
      env: {
        [key: string]: string | undefined;
        NODE_ENV: 'development' | 'production' | 'test';
      }
    }
  }
  
  export {}