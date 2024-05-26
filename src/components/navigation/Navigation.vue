<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const isMenuOpen = ref(false)
const router = useRouter()

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

watch(router, () => {
  closeMenu()
})
</script>

<template>
  <nav
    class="bg-white dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600"
  >
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
      <RouterLink to="/" class="block flex py-2 px-10 mx-5 text-white" aria-current="page">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >Space Explorer</span
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
        :class="[
          'md:flex',
          'items-center',
          'justify-end',
          'w-full',
          'md:w-auto',
          'md:order-1',
          isMenuOpen ? 'block' : 'hidden',
          'md:block'
        ]"
        id="navbar-sticky"
      >
        <RouterLink
          to="/"
          class="block py-2 px-10 mx-5 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 dark:text-green-400"
          aria-current="page"
        >
          Home
        </RouterLink>
        <RouterLink
          :to="{ name: 'nearEarthObjects' }"
          class="block py-2 px-10 mx-5 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 dark:text-green-400"
          aria-current="page"
        >
          Near Earth Objects
        </RouterLink>
        <RouterLink
          :to="{ name: 'marsRovers' }"
          class="block py-2 px-10 mx-5 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 dark:text-green-400"
          aria-current="page"
        >
          Mars Rovers
        </RouterLink>
      </div>
      <div
        :class="[
          'md:hidden',
          isMenuOpen ? 'flex' : 'hidden',
          'fixed',
          'inset-0',
          'bg-black',
          'z-30',
          'flex-col',
          'items-center',
          'justify-center',
          'space-y-4'
        ]"
      >
        <button
          @click="closeMenu"
          class="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <RouterLink to="/" class="text-green-500 text-2xl" @click="closeMenu"> Home </RouterLink>
        <RouterLink
          :to="{ name: 'nearEarthObjects' }"
          class="text-green-500 text-2xl"
          @click="closeMenu"
        >
          Near Earth Objects
        </RouterLink>
        <RouterLink :to="{ name: 'marsRovers' }" class="text-green-500 text-2xl" @click="closeMenu">
          Mars Rovers
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.router-link-active {
  color: rgb(39, 135, 77);
}
</style>
