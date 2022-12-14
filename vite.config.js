import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // below base line allows the gh-pages deploy to work correcty per vite-deploy-demo guidelines

  // mkcert allows me to run dev server over https, which is required for auth0 which needs to run from "secure web origin", if its not the provider throws an error
});
