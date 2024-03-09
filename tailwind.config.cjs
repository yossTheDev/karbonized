/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				'dark-base-100': '#212121',
				'dark-base-200': '#161618',
				'dark-base-300': '#161616',
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate"), require('tailwindcss-themer')({
		defaultTheme: {
			// put the default values of any config you want themed
			// just as if you were to extend tailwind's theme like normal https://tailwindcss.com/docs/theme#extending-the-default-theme
			extend: {
				// colors is used here for demonstration purposes
				colors: {
					primary: 'red'
				}
			}
		},
		themes: [
			{
				// name your theme anything that could be a valid css class name
				// remember what you named your theme because you will use it as a class to enable the theme
				name: 'my-theme',
				// put any overrides your theme has here
				// just as if you were to extend tailwind's theme like normal https://tailwindcss.com/docs/theme#extending-the-default-theme
				extend: {
					colors: {
						primary: 'blue'
					}
				}
			}
		]
	})],
}