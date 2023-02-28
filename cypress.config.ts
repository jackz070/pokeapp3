import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://127.0.0.1:5173/",
    experimentalMemoryManagement: true
  }
});
