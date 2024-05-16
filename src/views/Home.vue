<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { getPictureOfTheDay } from '../helpers/api/apiRoutes'
import DateHelper from '../helpers/api/DateHelper'
import { PictureOfTheDay } from '../interface/PictureOfTheDay'

const pictureOfTheDay = ref<PictureOfTheDay | null>(null)
const showRocket = ref(false)
const loading = ref(true)

onMounted(async () => {
  const imageData = await getPictureOfTheDay()
  pictureOfTheDay.value = imageData
})
</script>

<template>
  <div
    v-if="showRocket"
    class="h-10 absolute top-20 left-5 p-5 z-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-60 transition duration-300 ease-in-out cursor-pointer"
  >
    <img
      src="../assets/images/rocket.png"
      class="h-7 transition duration-300 ease-in-out transform hover:scale-110"
      alt="Space explorer logo"
      @click="showRocket = false"
    />
  </div>

  <header class="relative w-screen h-screen">
    <img
      v-if="pictureOfTheDay"
      :src="pictureOfTheDay.hdurl"
      alt="NASA picture of the day"
      class="absolute inset-0 w-full h-full object-cover"
      :class="{ 'blur-sm': loading }"
      @load="loading = false"
      @error="loading = false"
    />
    <div
      v-if="pictureOfTheDay && !showRocket"
      class="absolute inset-0 flex items-center justify-center p-4"
    >
      <div
        class="rounded-lg font-bold p-5 text-white text-center bg-black bg-opacity-50 w-4/5 sm:w-3/5 lg:w-2/5 absolute flex-column items-center justify-center p-4"
      >
        <font-awesome-icon
          icon="fa-solid fa-xmark"
          size="2xl"
          class="absolute top-0 right-0 m-4 text-white cursor-pointer"
          @click="showRocket = true"
        />

        <h2 class="font-extrabold p5 mb-5 text-green-400">
          {{ pictureOfTheDay.title }}
        </h2>
        <p>
          {{ pictureOfTheDay.explanation }}
        </p>
        <div class="text-gray-400 text-xs flex justify-between">
          <p>
            {{ pictureOfTheDay.copyright }}
          </p>
          <p class="text-gray-400 text-xs">
            {{ DateHelper.formatDate(pictureOfTheDay.date) }}
          </p>
        </div>
      </div>
    </div>
  </header>
</template>
<style scoped></style>
