/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        gray1: "#F5F5F5",
        gray2: "#D9D9D9",
        gray3: "#C4C4C4",
        gray4: "#8E8E8E",
        gray5: "#5F5F5F",
        black: "#000000",
        "bg-primary": "#8EB486",
        "btn-primary": "#72BF78",
        "primary-darkmode": "#C2FFC7",
        red1: "#FF0000",
        yellow1: "#FEE500",
      },
      boxShadow: {
        top: "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
      fontFamily: {
        pre: ["Pretendard"],
      },
    },
  },
  plugins: [],
};
