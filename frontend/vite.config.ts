import { defineConfig } from 'vite';
import federation from "@originjs/vite-plugin-federation";
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";
  return {
      host: true,        // REQUIRED in Docker
    port: 5173,
    server: {
      proxy: {
       '/api': {
    target: 'http://host.docker.internal:5000',
    changeOrigin: true,
    rewrite: path => path.replace(/^\/api/, '')
  }
    },
    },
   
     plugins: [
    react(),
    federation({
  remotes: {
    components: isDev
      ? "http://localhost:5001/assets/remoteEntry.js"
      : "https://authentication-app-4g9l.onrender.com/assets/remoteEntry.js", // adjust port/URL
  },
  shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ]
  }
 
});

