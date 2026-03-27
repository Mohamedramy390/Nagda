import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // Blue-600
        'background-light': '#f8fafc',
        'background-dark': '#0d141b',
        'text-light': '#0f172a',
        'text-dark': '#f8fafc',
      },
      fontFamily: {
        display: ['Inter', 'Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
