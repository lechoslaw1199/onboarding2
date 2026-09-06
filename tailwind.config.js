/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gotham: ["var(--font-gotham)", "Gotham Rounded", "sans-serif"],
        quicksand: ["var(--font-gotham)", "Gotham Rounded", "sans-serif"],
        sans: ["var(--font-gotham)", "Gotham Rounded", "sans-serif"],
      },
      colors: {
        'purple-primary': '#5032F5',
        'purple-dark': '#221750',
        'ls-blue': '#099FF9',
        'ls-green': '#09BD00',
        'ls-yellow': '#F9C700',
        'ls-red': '#FF1800',
        'ls-navy': '#182238',
        'blue-unselected': '#eff4fc',
        'tip-bg': '#e5e1ff',
        'app-bg': '#f8faff',
        'accent-gold': '#F19A2C',
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '300',
        medium: '400',
        semibold: '500',
        bold: '600',
        extrabold: '700',
        black: '800',
        '900': '800',
        '850': '750',
      }
    },
  },
  plugins: [],
}
