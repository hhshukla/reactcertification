/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      padding: "25px",
    },
    screens: {
      sm: "425px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
      "2xl": "1496px",
    },

    fontFamily: {
      Montserrat: ["Montserrat", "sans"],
      Unna: ["Unna", "serif"],
      Sacramento: ["Sacramento", "serif"],
      raleway: ["Raleway", "sans:serif"],
      ralewayBold: ["RalewayBold", "sans:serif"],
      Poppins: ["Poppins", "sans:serif"],
    },
    fontSize: {
      sm2: "14px",
      "4xl": "40px",
      "5xl": "48px",
      md3: "19.2px",
      sm1: "12px",
      md1: "18px",
      sm3: "15px",
      "3xl": "32px",
      "2xl": "30px",
      xl: "24px",
      md2: "20px",
    },
    fontWeight: {
      light: "300",
      md: "400",
      bold: "500",
      extraBold: "700",
    },

    colors: {
      mainBg: "#818181",
      white: "#fff",
      lightColor: "#737373",
      subColor: "#21325E",
      primary: "#b3b3b3",
      secondary: "#21325E",
      ternary: "#888",
      black: "#000",
      borderColor: " #ced4da",
      purple: "#800080	",
      red: "#FF0000",
    },
    extend: {},
  },
  plugins: [],
};
