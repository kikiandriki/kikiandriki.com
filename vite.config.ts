import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import paths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
    manifest: true,
  },
  plugins: [react(), paths({ root: "../" })],
})
