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
					primary: '#E838A7',
					neutral: '#eff0f0',
				},

				dark: {
					...require('daisyui/src/theming/themes')['[data-theme=dark]'],
					primary: '#E838A7',
				},
			},
			'dark',
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
