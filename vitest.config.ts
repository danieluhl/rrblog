/// <reference types="vitest" />
import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  test: {
    include: ["./**/*.test.{ts,tsx}"],
    // eclude integration tests - covered by playwright
    exclude: ["tests/**", "**node_modules**"],
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./app"),
    },
  },
});
