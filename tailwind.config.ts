import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pharmacy: {
          primary: '#059669',
          secondary: '#10b981',
          light: '#d1fae5',
          dark: '#064e3b',
        },
      },
    },
  },
  plugins: [],
}
export default config
