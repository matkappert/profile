import { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
// import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
    require('@headlessui/tailwindcss'),
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.neutral[900],
      white: colors.neutral[200],
      gray: colors.neutral,
      indigo: colors.indigo,
      violet: colors.violet,

      red: colors.red,
      green: colors.green,
      blue: colors.blue,
    },

  },
};
