const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: [
    './index.html',
    './src/**/*.{js,vue}'
  ],
  darkMode: false,
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      // xl: '1200px',
    },
    scale: {
      '108': '1.08',
      '120': '1.2',
    },
    letterSpacing: {
      widest: '.2em',
    },
    extend: {
      fontFamily: {
        'sans': 'Comfortaa, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
      },
      colors: {
        emerald: colors.emerald,
        'telegram-400': '#0AF',
        'telegram-500': '#08C',
        'telegram-600': '#069',
        'viber-400': '#867EBD',
        'viber-500': '#665CAC',
        'viber-600': '#51488D',
        'messenger-400': '#3393FF',
        'messenger-500': '#0078FF',
        'messenger-600': '#0060CC',
      },
      animation: {
        'scale': 'animate-scale .8s cubic-bezier(0, 0, .2, 1) 2'
      },
      keyframes: {
        'animate-scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        }
      },
    },
  },
  variants: {
    extend: {
      textColor: [
        'selection'
      ],
      backgroundColor: [
        'selection'
      ],
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-selection-variant'),
    function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '540px',
          },
          '@screen md': {
            maxWidth: '720px',
          },
          '@screen lg': {
            maxWidth: '920px',
          },
          // '@screen xl': {
          //   maxWidth: '1140px',
          // },
        }
      })
    },
  ]
}
