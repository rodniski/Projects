/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "light",
      "dark",
    ],
  },
  plugins: [require('daisyui'), require('flowbite/plugin')],

};