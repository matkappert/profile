<template>
  <div class="flex space-x-4">
    <a
      v-for="social in useAppConfig().socialLinks"
      :key="social.url"
      target="_blank"
      class="hover:opacity-60 w-8 h-8 flex items-center justify-center rounded-md"
      :title="social.title"
      :aria-label="social.title"
      :href="social.url">
      <Icon
        :name="social.icon"
        class="dark:text-white text-black h-4 w-4" />
    </a>
  </div>
</template>
