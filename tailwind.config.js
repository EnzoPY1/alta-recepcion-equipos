/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Incluye todos los archivos React para que TailwindCSS procese los estilos
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
