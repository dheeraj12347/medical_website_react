import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite reads this file to know which frontend framework plugin to use.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
});
