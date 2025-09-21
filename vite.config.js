import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";
import eslint from "vite-plugin-eslint";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), svgr(), eslint(), tailwindcss()],
    build: {
      outDir: "dist",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      open: true,
      port: 3000,
      host: "0.0.0.0",
      hmr: {
        host: env.VITE_HOST_IP || "localhost",
      },
    },
  };
});
