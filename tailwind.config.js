export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { primary: { DEFAULT: '#0f5c4d', dark: '#0a443a', light: '#e6f2ef' }, accent: '#e8590c', ink: '#1c2421' },
    fontFamily: { sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'] },
  } },
  plugins: [],
}
