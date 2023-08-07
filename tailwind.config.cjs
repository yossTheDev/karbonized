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
					primary: '#e84467',

					secondary: '#e36a5c',

					accent: '#d97706',

					neutral: '#e5e7eb',

					info: '#22d3ee',

					success: '#9CB686',

					warning: '#FFD261',

					error: '#FC9783',

					'base-100': '#141414',
					'base-200': '#f3f4f6',
					'base-300': '#ced3d9',
					'base-content': '#000000',
				},

				dark: {
					primary: '#e84467',

					secondary: '#e36a5c',

					accent: '#d97706',

					neutral: '#111111',

					'base-100': '#0A0A0A',

					info: '#22d3ee',

					success: '#9CB686',

					warning: '#FFD261',

					error: '#FC9783',

					'base-200': '#0E0E0E',
					'base-300': '#ced3d9',
					'base-content': '#000000',
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
