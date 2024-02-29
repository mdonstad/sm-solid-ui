import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
// import devtools from 'solid-devtools/vite';
import copy from 'rollup-plugin-copy';
export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
      copy({
          copyOnce: true,
          targets: [
            {
              src: './node_modules/@shoelace-style/shoelace/dist/assets',
              dest:'./dist/assets/shoelace'
            },
           
          ],
          hook: 'writeBundle' // notice here
        })
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
