/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3231",
        bgcard: "#F5F1E3",
        btn: "#F34C4A",
        btnh: "#D64544",
        btns: "#518582",
        btnsh: "#3D6361",
        form: "#D8D8DD",
      },
    },
    daisyui: {
      themes: false,
    },
  },
  plugins: [require("daisyui")],
};
