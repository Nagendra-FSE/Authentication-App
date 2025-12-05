import { defineConfig } from 'vite';
import federation from "@originjs/vite-plugin-federation";
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
     federation({
      name: "user",
      filename: "remoteEntry.js",
      exposes: {
        "./User": "./src/pages/User",
      },
        shared: [
        "react",
        "react-dom",
        "react-router-dom"
      ],
    }),
  ],
    build: {
    target: "esnext",
    modulePreload: false,
    minify: false,        // during dev you can keep false
    cssCodeSplit: false,
  }
})
