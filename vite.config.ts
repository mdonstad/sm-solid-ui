import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { VitePWA } from 'vite-plugin-pwa'
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
    VitePWA({
      injectRegister: 'inline',
      manifest: { 
        name: 'Smart Mixers',
        theme_color: "#119ee2",
        icons: [
          {
            src: "/icons/maskable_512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/icons/512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icons/maskable_128.png",
            sizes: "128x128",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/icons/128.png",
            sizes: "128x128",
            type: "image/png",
          },
        ]
      }
    }),
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
