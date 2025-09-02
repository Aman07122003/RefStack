import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  define: {
    global: "window", // ✅ Fix Draft.js "global is not defined"
  },
});
