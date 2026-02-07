/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      noScrollbar: {
        "&::-webkit-scrollbar": {
          width: "0px",
          height: "8px", // Keep horizontal scrollbar height if needed
        },
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
      },
      fontFamily: {
        geologica: ["Geologica", "sans-serif"],
        dmsans: ["DM Sans", "sans-serif"],
      },
      colors: {
        primaryColor: "#ff3443",
        primaryFadedColor: "#96c2e3",
        primaryTextColor: "#242424",
        secondaryTextColor: "#616161",
        primaryBtnColor: "#ff3443",
        primaryBtnHoverColor: "#ff3600",
        skeletonLoaderColor: "#ffdfe1",
      },
    },
  },
  plugins: [],
};
