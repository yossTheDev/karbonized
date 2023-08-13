/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{html,js,ts,jsx,tsx}',
		'node_modules/daisyui/dist/**/*.js',
		'node_modules/react-daisyui/dist/**/*.js',
	],

	// enable dark mode via class strategy
	darkMode: 'class',

	plugins: [require('daisyui'), require('@tailwindcss/typography')],

	// daisyUI config (optional)
	daisyui: {
		// themes: true,
		themes: [
			{
				light: {
					...require('daisyui/src/theming/themes')['[data-theme=light]'],
					primary: '#f43f5e',
					neutral: '#eff0f0',
				},

				dark: {
					primary: '#f43f5e',

					secondary: '#abfcc1',

					accent: '#0ea5e9',

					neutral: '#353535',

					'base-100': '#232323',
					'base-200': '#212121',
					'base-300': '#161616',

					info: '#38a5dc',

					success: '#229187',

					warning: '#cf7507',

					error: '#fc4a27',
				},
			},
		],
		styled: true,
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: '',
		darkTheme: 'dark',
	},
};
