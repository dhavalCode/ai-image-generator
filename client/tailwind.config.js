/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
import daisyui from 'daisyui'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            screens: {
                xs: '475px',
                ...defaultTheme.screens,
            },
            colors: {
                neutral: colors.slate,
            },
            fontFamily: {
                lato: ['Lato', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif'],
            },
            animation: {
                text: 'text 10s ease infinite',
            },
            keyframes: {
                text: {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center',
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center',
                    },
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [daisyui],
    daisyui: {  
        darkTheme: 'light',
    },
}
