import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
    build: {
      outDir: './docs'
    },
  base: 'https://houston1304.github.io/TON_Web/'
});