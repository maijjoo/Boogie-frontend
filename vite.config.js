import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  // 외부 접속 허용(localhost 외의 접속도 허용)
  // dev 과정에서 폰으로도 접속하려면 필수 설정
  server: {
    host: true, // 또는 '0.0.0.0'
  },
});
