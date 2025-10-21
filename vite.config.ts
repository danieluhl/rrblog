import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";
import fs from "node:fs";

const esmExtensionResolver = () => ({
  name: "esm-extension-resolver",
  resolveId(source: string, importer: string | undefined) {
    if (
      (importer && // Must have an importer
        source.startsWith("./")) || // Must be a relative import
      source.startsWith("../") // or a parent-relative import
    ) {
      // 1. Check if the file exists with a .js extension
      const resolvedPath = path.resolve(
        path.dirname(importer || ""),
        source + ".js",
      );

      if (fs.existsSync(resolvedPath)) {
        // 2. Return the new, fully resolved path
        return resolvedPath;
      }
    }
    // Let other plugins handle everything else
    return null;
  },
});

export default defineConfig({
  plugins: [
    esmExtensionResolver(),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
});
