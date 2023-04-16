module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#14B8A6",
        primaryDark: "#12A796",
        gray900: "#2A3342",
        gray800: "#333F51",
        gray700: "#5D6F8C",
        gray400: "#8896AB",
        white: "#FFFFFF",
        white100: "#F2FFFE",
        white400: "#4C5463",
        white200: "#DAFFFB",
      },
      fontFamily: {
        poppins: ["Inter", "sans-serif"],
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
