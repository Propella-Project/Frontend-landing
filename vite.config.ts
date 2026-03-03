import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { inspectAttr } from "kimi-plugin-inspect-react";

export default defineConfig({
  base: "./",
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://propella-api.vercel.app",
        changeOrigin: true,
        // ❌ Remove rewrite – keep the /api prefix
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
