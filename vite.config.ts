/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import mkcert from "vite-plugin-mkcert";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: true },
  plugins: [react(), mkcert()],
  test: { globals: true, environment: "jsdom", setupFiles: "./src/__tests__/vitest-setup.js" }
});
