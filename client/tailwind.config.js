/ @type {import('tailwindcss').Config} /;
export default {
  content: ["./*.html", "./src/**/**/**/*.jsx", "./src/views/**/*.jsx", "./node_modules/@tremor/**/*.jsx",],
  theme: {
    extend: {},
    fontSize: {
      24: "24px",
      18: "18px",
      16: "16px",
      14: "14px",
    },
  },
  plugins: [],
};

