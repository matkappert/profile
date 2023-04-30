// import { createResolver } from '@nuxt/kit';
// const { resolve } = createResolver(import.meta.url);

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
    // 'github:matkappert/nuxt-ui#master',
  ],
  alias: {
    // 'class-variance-authority': require.resolve('class-variance-authority'),
    // 'tailwindcss': require.resolve('tailwindcss/lib/index.js'),
    // 'tailwindcss/colors': require.resolve('tailwindcss/colors.js'),
    // 'zod': 'zod',
    // 'class-variance-authorit': 'class-variance-authorit',
    // 'tailwindcss': 'tailwindcss',
    // 'tailwindcss/colors': 'tailwindcss/colors',
  },
  ssr: true,
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:8788/api',
        changeOrigin: true,
      },
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://matkappert.com',
      siteName: 'Mat Kappert',
      siteDescription: 'Personal profile for software developer and electronics technician Mat Kappert.',
      language: 'en-AU',
      titleSeparator: '|',
    },
  },
  linkChecker: {
    failOn404: true,
  },
});
