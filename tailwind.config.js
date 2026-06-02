/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // 🌟 เพิ่มโซน fontFamily ตรงนี้เข้าไปครับ
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        lexend: ["Lexend"],
      },
    },
  },
  plugins: [],
};
