import { defineConfig } from 'vite';
import federation from "@originjs/vite-plugin-federation";
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
  remotes: {
    user: 'http://localhost:5001/assets/remoteEntry.js', // adjust port/URL
  },
  shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
})
