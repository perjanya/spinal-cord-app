export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0b1220',
        glow: '#74d1ef',
        accent: '#8b5cf6',
      },
      boxShadow: {
        neon: '0 0 30px rgba(116, 209, 239, 0.15)',
      },
    },
  },
  plugins: [],
};
