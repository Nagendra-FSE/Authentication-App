import { defineConfig } from 'vite';
import federation from "@originjs/vite-plugin-federation";
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
     plugins: [
    react(),
    federation({
  remotes: {
    user: isDev
      ? "http://localhost:5001/assets/remoteEntry.js"
      : "https://authentication-app-4g9l.onrender.com/assets/remoteEntry.js", // adjust port/URL
  },
  shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ]
  }
 
});

