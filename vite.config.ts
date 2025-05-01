import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    exclude: ["node_modules", "build", "dist"],
    dir: "src",
    workspace: [
      {
        extends: true,
        test: {
          name: "unit",
          dir: "src/services",
        },
      },
      {
        extends: true,
        test: {
          name: "e2e",
          dir: "src/http/controllers",
          environment:
            "./prisma/vitest-environment-prisma/prisma-test-environment.ts",
        },
      },
    ],
  },
});
