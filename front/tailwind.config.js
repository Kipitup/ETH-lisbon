const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				transparent: 'transparent',
				white: '#ffffff',
				darkBg: '#080B11',

			},
			
			fontFamily: {
				jakarta: ['var(--font-plusJakartaSans)', ...fontFamily.sans],
				inter: ['var(--font-inter)', ...fontFamily.sans]
			},
			
		}
	},
	plugins: [require('@tailwindcss/forms')]
}
