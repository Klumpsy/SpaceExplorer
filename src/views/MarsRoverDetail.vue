<template>
  <div class="min-h-screen flex flex-col items-center p-4">
    <header class="bg-black bg-opacity-50 p-4 rounded mb-8">
      <h1 class="text-3xl font-bold text-white">{{ roverName }}</h1>
    </header>
    <div class="max-w-2xl w-full bg-white rounded shadow-lg p-6">
      <img :src="roverImage" alt="Rover image" class="w-full h-64 object-cover mb-4" />
      <p class="text-gray-700">Details about {{ roverName }}...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const roverName = computed(() => route.params.roverName)
const roverImage = computed(() => {
  switch (roverName.value.toLowerCase()) {
    case 'curiosity':
      return new URL('../assets/images/curiosity.jpg').href
    case 'opportunity':
      return new URL('../assets/images/opportunity.jpg').href
    case 'spirit':
      return new URL('../assets/images/spirit.jpg').href
    default:
      return ''
  }
})
</script>

<style scoped>
img {
  width: 100%;
  height: auto;
}
</style>
