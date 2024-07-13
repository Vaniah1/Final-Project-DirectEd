
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
  //   chunkSizeWarningLimit: 10000,
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         if (id.includes('node_modules')) {
  //           return id.toString().split('node_modules/')[1].split('/')[0].toString();
  //         }
  //       },
  //     },
  //   },
  },
  plugins: [react()],
//   resolve: {
//     alias: {
//       '@mui/styled-engine': '@mui/styled-engine-sc',
//       '@': path.resolve(__dirname, 'src'),
//       'pages': path.resolve(__dirname, 'src/pages'),
//       'components': path.resolve(__dirname, 'src/components'),
//     },
//   },
//   optimizeDeps: {
//     include: ['@mui/material', '@mui/icons-material'],
//   },
//   esbuild: {
//     logOverride: { 'this-is-undefined-in-esm': 'silent' }
//   },
 })
