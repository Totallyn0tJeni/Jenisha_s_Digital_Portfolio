/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    safelist: [
        { pattern: /^bg-(violet|purple|fuchsia|amber|emerald|rose|blue|cyan|indigo|teal|pink|orange|yellow)-500\/15$/ },
        { pattern: /^text-(violet|purple|fuchsia|amber|emerald|rose|blue|cyan|indigo|teal|pink|orange|yellow)-400$/ },
        { pattern: /^border-(violet|purple|fuchsia|amber|emerald|rose|blue|cyan|indigo|teal|pink|orange|yellow)-500\/(15|20|25|30|40)$/ },
        { pattern: /^bg-(violet|purple|fuchsia|amber|emerald|rose|blue|cyan|indigo|teal|pink|orange|yellow)-400$/ },
        { pattern: /^text-(violet|purple|fuchsia|amber|emerald|rose|blue|cyan|indigo|teal|pink|orange|yellow)-200$/ },
        { pattern: /^fill-(violet|amber)-400$/ },
        'glass', 'glass-strong', 'glass-card', 'text-gradient', 'bg-gradient-primary', 'bg-gradient-soft',
        'glow-primary', 'grid-pattern', 'dot-pattern', 'scrollbar-hide', 'shimmer',
        'font-display', 'font-heading',
    ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			xl: 'calc(var(--radius) + 4px)',
  			'2xl': 'calc(var(--radius) + 8px)',
  			'3xl': 'calc(var(--radius) + 16px)',
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
			surface: {
				DEFAULT: 'hsl(var(--surface))',
				elevated: 'hsl(var(--surface-elevated))',
			},
  			card: {
  				DEFAULT: 'hsl(var(--surface))',
  				foreground: 'hsl(var(--foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--surface-elevated))',
  				foreground: 'hsl(var(--foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--background))',
  				light: 'hsl(var(--primary-light))',
  				lighter: 'hsl(var(--primary-lighter))',
  				lightest: 'hsl(var(--primary-lightest))',
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--background))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			success: 'hsl(var(--success))',
  			warning: 'hsl(var(--warning))',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(258 90% 66%)',
  				'2': 'hsl(258 96% 86%)',
  				'3': 'hsl(262 83% 58%)',
  				'4': 'hsl(270 67% 96%)',
  				'5': 'hsl(276 43% 12%)'
  			},
  		},
  		fontFamily: {
  			heading: ['var(--font-heading)'],
  			body: ['var(--font-body)'],
  			display: ['var(--font-display)'],
  			mono: ['var(--font-mono)']
  		},
  		fontSize: {
			'display-2xl': ['4.5rem', { lineHeight: '1.05', fontWeight: '800' }],
			'display-xl': ['3.5rem', { lineHeight: '1.1', fontWeight: '800' }],
			'display-lg': ['2.5rem', { lineHeight: '1.15', fontWeight: '700' }],
			'display-md': ['2rem', { lineHeight: '1.2', fontWeight: '700' }],
			'heading': ['1.5rem', { lineHeight: '1.3', fontWeight: '700' }],
			'body-lg': ['1.25rem', { lineHeight: '1.6', fontWeight: '400' }],
			'body': ['1rem', { lineHeight: '1.65', fontWeight: '400' }],
			'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
			'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
		},
  		boxShadow: {
  			'soft': 'var(--shadow-soft)',
  			'card': 'var(--shadow-card)',
  			'glow': 'var(--shadow-glow)',
  		},
  		transitionTimingFunction: {
  			'premium': 'cubic-bezier(0.16, 1, 0.3, 1)',
  		},
  		transitionDuration: {
  			'500': '500ms',
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			},
  			'float': {
  				'0%, 100%': { transform: 'translateY(0)' },
  				'50%': { transform: 'translateY(-12px)' },
  			},
  			'fade-in': {
  				from: { opacity: '0' },
  				to: { opacity: '1' },
  			},
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'float': 'float 6s ease-in-out infinite',
  			'fade-in': 'fade-in 0.6s ease-out',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
