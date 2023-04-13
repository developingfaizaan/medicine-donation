module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        primaryDark: "#3575DD",
        gray900: "#2A3342",
        gray800: "#333F51",
        gray700: "#5D6F8C",
        gray400: "#8896AB",
        white: "#FFFFFF",
        white100: "#F0F6FE",
        white400: "#4C5463",
        white200: "#CEE0FD",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
