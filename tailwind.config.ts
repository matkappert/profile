import { Config } from 'tailwindcss';

export default <Partial<Config>>{
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
    require('@headlessui/tailwindcss'),

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
