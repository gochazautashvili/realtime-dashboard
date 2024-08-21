import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigepaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigepaths(), react()],
});
