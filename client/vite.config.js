
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import compress from 'vite-plugin-compress';

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
  plugins: [react(), compress({
    verbose: true,
    disable: false,
    threshold: 10240,
    filter: '/\.(js|css|json|jsx)$/', // Adjust this filter based on your file types
  }),],
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
