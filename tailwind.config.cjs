/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}', 'node_modules/daisyui/dist/**/*.js', 'node_modules/react-daisyui/dist/**/*.js'],

  // enable dark mode via class strategy
  // darkMode: 'class',

  plugins: [require('daisyui'), require('@tailwindcss/typography')],

  // daisyUI config (optional)
  daisyui: {
    // themes: true,
    themes: [
      {
        light: {
          primary: '#0ea5e9',

          secondary: '#263F40',

          accent: '#d97706',

          neutral: '#0E111A',

          'base-100': '#D9D9D9',

          info: '#22d3ee',

          success: '#9CB686',

          warning: '#FFD261',

          error: '#FC9783',

          'base-200': '#FFFFFF',
          'base-300': '#ced3d9',
          'base-content': '#000000'

        },

        dark: {
          primary: '#0ea5e9',

          secondary: '#263F40',

          accent: '#d97706',

          neutral: '#0E111A',

          'base-100': '#090c12',

          info: '#22d3ee',

          success: '#9CB686',

          warning: '#FFD261',

          error: '#FC9783',

          'base-200': '#07090D',
          'base-300': '#ced3d9',
          'base-content': '#000000'

        }
      }

    ],
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark'
  }
}
