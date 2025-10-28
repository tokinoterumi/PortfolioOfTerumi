/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './src/app.html'],
	theme: {
		extend: {
			// Custom color palette matching your design system
			colors: {
				'cyanotype-blue': '#1D4E89',
				'darkroom-red': '#B22222',
				'polaroid-yellow': '#E3B23C',
				'silver-halide-grey': '#AAB2BD',
				'background-light': '#f5f5f4',
				'text-primary': '#333333',
				'text-secondary': '#555555',
				// Add standard gray scale
				gray: {
					100: '#f7f8f9',
					200: '#e1e7ef',
					300: '#cbd2d9',
					400: '#9aa5b1',
					500: '#697586',
					600: '#4b5563',
					700: '#374151',
					800: '#1f2937',
					900: '#111827'
				},
				stone: {
					50: '#fafaf9',
					100: '#f5f5f4',
					200: '#e7e5e4',
					300: '#d6d3d1',
					400: '#a8a29e',
					500: '#78716c',
					600: '#57534e',
					700: '#44403c',
					800: '#292524',
					900: '#1c1917'
				}
			},

			// Custom font families
			fontFamily: {
				sans: ['greycliff-cf', 'DM Sans', 'sans-serif'],
				serif: ['greycliff-cf', 'DM Sans', 'sans-serif'],
				display: ['Bebas Neue', 'sans-serif'],
				dm: ['DM Sans', 'sans-serif']
			},

			// Custom spacing values
			spacing: {
				15: '3.75rem', // 60px for left positioning
				18: '4.5rem', // 72px
				22: '5.5rem' // 88px
			},

			// Custom viewport units
			height: {
				screen: '100vh',
				'90vh': '90vh',
				'80vh': '80vh',
				'70vh': '70vh'
			},

			width: {
				'90vw': '90vw',
				'95vw': '95vw',
				'85vw': '85vw'
			},

			// Custom z-index values
			zIndex: {
				1000: '1000',
				1001: '1001',
				2000: '2000'
			},

			// Custom animation durations
			transitionDuration: {
				400: '400ms',
				700: '700ms'
			},

			// Custom border radius (if needed)
			borderRadius: {
				none: '0'
			},

			// Custom backdrop blur
			backdropBlur: {
				xs: '2px',
				sm: '4px',
				md: '8px',
				lg: '16px'
			},

			// Custom animation keyframes
			keyframes: {
				slideInUp: {
					from: {
						opacity: '0',
						transform: 'translateY(2rem)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				subtleBreathe: {
					'0%': { opacity: '0' },
					'50%': { opacity: '0.7' },
					'100%': { opacity: '0' }
				}
			},

			// Custom animations
			animation: {
				'slide-in-up': 'slideInUp 0.8s ease-out forwards',
				'subtle-breathe': 'subtleBreathe 5s ease-in-out infinite'
			}
		}
	},
	plugins: [
		// Add any Tailwind plugins you might need
		// require('@tailwindcss/typography'),
		// require('@tailwindcss/forms'),
		// require('@tailwindcss/aspect-ratio'),
	]
};
