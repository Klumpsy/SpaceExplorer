<script setup lang="ts">
import { ref } from 'vue'

const rovers = ref([
  {
    name: 'Curiosity',
    imgSrc: new URL('../assets/images/curiosity.jpg', import.meta.url).href,
    link: '/mars-rovers/curiosity'
  },
  {
    name: 'Opportunity',
    imgSrc: new URL('../assets/images/opportunity.jpg', import.meta.url).href,
    link: '/mars-rovers/opportunity'
  },
  {
    name: 'Spirit',
    imgSrc: new URL('../assets/images/spirit.jpg', import.meta.url).href,
    link: '/mars-rovers/spirit'
  }
])
</script>

<template>
  <div class="bg-mars min-h-screen flex flex-col items-center p-4">
    <header class="bg-black bg-opacity-70 p-4 rounded mb-8 w-full max-w-5xl">
      <h1 class="text-3xl font-bold text-white text-center">Pick your rover</h1>
    </header>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
      <a
        v-for="rover in rovers"
        :key="rover.name"
        :href="rover.link"
        class="block w-full bg-black bg-opacity-70 rounded overflow-hidden shadow-lg transform transition duration-500 hover:scale-105"
        style="height: 350px"
      >
        <img :src="rover.imgSrc" alt="rover image" class="w-full h-3/4 object-cover" />
        <div class="px-6 py-4 h-1/4 flex items-center justify-center">
          <div class="font-bold text-xl text-center text-green-500 hover:text-blue-500">
            {{ rover.name }}
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 100%;
  height: auto;
}
.bg-mars {
  background-image: url('../assets/images/mars.jpg');
  background-size: cover;
  background-position: center;
}
</style>
