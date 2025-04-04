import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { analyzer } from "vite-bundle-analyzer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), analyzer()],
  build: {
    outDir: "docs",
    emptyOutDir: true, // also necessary
  },
});
