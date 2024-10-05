/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-green": "#32A279",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      // 커스텀 브레이크포인트
      "3xl": "1920px",
      mobile: { max: "639px" },
      tablet: { min: "640px", max: "1023px" },
      desktop: { min: "1024px" },
    },
  },
  plugins: [],
};
