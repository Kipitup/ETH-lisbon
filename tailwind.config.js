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
				darkBorder: '#254134',
				divideGray: '#545454',
				divideGray2: '#393939',
				lightGreen: '#8FFFAF',
				darkGreenB: '#2E3A35',
				darkGrey: '#303030',
				darkGreyCC: '#303030CC',
				elGrey: '#8E8C8C',
				gTextColor: '#C7D8C9',
				lightTextC: '#F2F2F2',
				lightBorder: '#DDDDDD',
				tagColor: '#293249',
				greenBtn: '#005538',
				greenBorder: '#88B484',
				greyBorder: '#C0C0C0',
				greyDarkBorder: '#8E8C8C',
				greyMedumBorder: '#393A39',
				greyPrimary: '#CECECF',
				greyIcon: '#CECFD0',
				grayStat: '#9EA1A1',
				lightGreenT: '#88E890',
				darkBorderG: '#073A0B',
				lightTextSH: '#CECED0',
				headTextC: '#CFD1D1',
				yellowBg: '#F1A33B',
				greenBg: '#16B57F',
				greyBg: '#4F4F4F',
				redBg: '#E45555',
				h2Gray: '#88898C',
				greyGreenbg: '#0A2908',
				rose: {
					50: '#fff1f2',
					100: '#ffe4e6',
					200: '#fecdd3',
					300: '#fda4af',
					400: '#fb7185',
					500: '#f43f5e',
					600: '#e11d48',
					700: '#be123c',
					800: '#9f1239',
					900: '#881337'
				},
				darkBgBlack: '#0F171E',
				white80: 'rgba(255, 255, 255, 0.8)',
				borderGreen: '#284637',
				borderRed: '#E45555',
				borderGRGB: 'rgba(143, 255, 175, 0.24)'
			},
			boxShadow: {
				list: '0px 12px 120px rgba(143, 255, 175, 0.08)'
			},
			fontFamily: {
				jakarta: ['var(--font-plusJakartaSans)', ...fontFamily.sans],
				inter: ['var(--font-inter)', ...fontFamily.sans]
			},
			height: {
				navbar: '7vh',
				footer: '4vh',
				statsheader: '8vh',
				offerwidget: '149px'
			},
			width: {
				sidbar: '217px',
				rightsidebar: '332px'
			},
			screens: {
				'3xl': '1700px',
				'4xl': '2000px',
				'5xl': '2300px'
			},
			keyframes: {
				shimmer: {
					'100%': {
						transform: 'translateX(100%)'
					}
				}
			},
			fontSize: {
				'custom-xs': ['10px', '14px']
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
}
