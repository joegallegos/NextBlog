module.exports = {
  purge: {
    enabled: true,
    content: [
      './pages/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
    ],
  },
  theme: {
    extend: {
      colors: {
        brand: '#8AA399',
        link: '#6E0E0A',
      },
    },
  },
  variants: {},
  plugins: [],
};
