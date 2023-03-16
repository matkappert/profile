<script setup lang="ts">
// useSeoMeta({
//   title: 'Welcome',
//   description: 'Mat Kappert; Experienced software developer and electronic technician with a diverse skill set.',
// });

</script>

<template>
  <div class="relative">
    <SeoKit />

    <!-- blur -->
    <div class="backdrop-blur-3xl min-h-screen overflow-hidden h-full">
      <div class="w-full max-w-7xl mx-auto pt-4">
        <div class="flex w-full">
          <div class="grow ">
          </div>
          <div class="grow">
          </div>
          <div class="">
            <Social />
          </div>
        </div>
      </div>

      <div class="w-full max-w-4xl mt-10 mx-auto">
        <!-- content -->
        <p class="text-base font-semibold leading-7 dark:text-indigo-400 text-violet-600">
          Introducing
        </p>
        <h1 class="text-6xl font-bold tracking-tight text-black dark:text-white">
          Mat Kappert
        </h1>
        <p class="mt-10 dark:text-gray-300 text-gray-800">
          As an experienced software developer and electronic technician with a diverse skill set, I specialize in advanced web development, user interface design, and debugging.<br>
          With a proven track record in developing, testing, and maintaining complex web systems, I am dedicated to continuously expanding my technical knowledge through ongoing learning and exploration of new tools and approaches.<br>
          Let me bring my expertise to your project and help you achieve your goals.<br>
        </p>
      </div>
    </div>
  </div>
</template>
