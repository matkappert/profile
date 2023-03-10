import { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
// import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.neutral[900],
      white: colors.neutral[200],
      gray: colors.neutral,
    },

  },
};
