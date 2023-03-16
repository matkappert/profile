// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    'nuxt-icon',
  ],
  extends: [
    'nuxt-seo-kit',
    // '../nuxt-ui/',
    // 'github:matkappert/nuxt-ui#main',
  ],
  alias: {
    'class-variance-authority': require.resolve('class-variance-authority'),
    // 'tailwindcss': require.resolve('tailwindcss/lib/index.js'),
    // 'tailwindcss/colors': require.resolve('tailwindcss/colors.js'),
  },
  ssr: true,
  nitro: {
    // preset: 'cloudflare',
    preset: 'cloudflare_pages',
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://profile.kappert.workers.dev',
      siteName: 'Mat Kappert',
      siteDescription: 'Personal profile for software developer and electronics technician Mat Kappert.',
      language: 'en-AU',
      titleSeparator: '|',
    },
  },
  linkChecker: {
    failOn404: true,
  }
});
