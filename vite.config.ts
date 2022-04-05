import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";
import alias from "@rollup/plugin-alias";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  define: {},
  plugins: [
    vue(),
    alias({
      entries: [{ find: "@", replacement: resolve("./src") }],
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus(),
  ],

  server: {
    port: 8000,
    proxy: {
      "/up": {
        target: "http://localhost:3100",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/up/, ""),
      },
    },
  },
  build: {
    minify: true,
  },
});
