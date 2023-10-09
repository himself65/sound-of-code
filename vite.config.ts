import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  publicDir: "static",
  plugins: [react()],
  server: {
    host: '0.0.0.0'
  }
});
