import catppuccin from '@catppuccin/daisyui'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,vue}'
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [,  catppuccin("mocha", { primary: 'mauve', secondary: 'sky' })]
  },
  plugins: [require('daisyui'),require("@catppuccin/tailwindcss")({ defaultFlavor: "mocha" })],
}

