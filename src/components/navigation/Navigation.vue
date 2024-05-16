<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <nav
    class="bg-white dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600"
  >
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
      <RouterLink to="/" class="block flex py-2 px-10 mx-5 text-white" aria-current="page">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >Space explorer</span
        >
      </RouterLink>
      <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button
          @click="toggleMenu"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          :aria-expanded="isMenuOpen"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div
        class="hidden md:flex items-center justify-end w-full md:w-auto md:order-1"
        :class="{ 'flex flex-col fixed inset-0 bg-white z-30': isMenuOpen, hidden: !isMenuOpen }"
        id="navbar-sticky"
      >
        <RouterLink
          to="/"
          class="block py-2 px-10 mx-5 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 dark:text-green-400"
          aria-current="page"
          >Home</RouterLink
        >
        <RouterLink
          :to="{ name: 'nearEarthObjects' }"
          class="block py-2 px-10 mx-5 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 dark:text-green-400"
          aria-current="page"
          >Near Earth Objects</RouterLink
        >
        <RouterLink
          :to="{ name: 'champions' }"
          class="block py-2 px-10 mx-5 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 dark:text-green-400"
          aria-current="page"
          >Planets</RouterLink
        >
      </div>
    </div>
  </nav>
</template>

<style scoped>
.router-link-active {
  color: rgb(39, 135, 77);
}
@media (max-width: 768px) {
  #navbar-sticky {
    flex-direction: column;
    align-items: center;
  }
}
</style>
