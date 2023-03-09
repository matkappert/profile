// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
    '../nuxt-ui/',
    // 'github:matkappert/nuxt-ui#main',
  ],
  alias: {
    'class-variance-authority': require.resolve('class-variance-authority'),
    'tailwindcss': require.resolve('tailwindcss/lib/index.js'),
    'tailwindcss/colors': require.resolve('tailwindcss/colors.js'),
  },

});
