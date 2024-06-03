<template>
  <div class="bg-mars-detail min-h-screen flex flex-col items-center p-4 relative">
    <div class="container mx-auto p-4 relative">
      <router-link to="/mars-rovers" class="mb-3">
        <button
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400 transition-colors"
        >
          Back
        </button>
      </router-link>
      <div class="flex flex-col md:flex-row items-center gap-4 justify-around pt-4">
        <div class="flex flex-col items-center md:order-1">
          <div class="rounded-full overflow-hidden w-48 h-48 relative">
            <img :src="roverImage" alt="Rover badge" class="w-full h-full object-cover" />
          </div>
          <div class="mt-2 text-white text-xl font-bold">
            {{ roverName }}
          </div>
        </div>
        <div class="flex flex-col w-full md:w-auto md:order-2">
          <div
            class="flex flex-col md:flex-row gap-2 w-full md:items-end bg-gray-800 bg-opacity-90 p-4 rounded shadow"
          >
            <div class="w-full md:w-auto flex flex-col">
              <label for="camera" class="mb-2 text-white">Camera:</label>
              <select
                v-model="selectedCamera"
                class="p-1 border rounded bg-gray-700 text-white w-full md:w-auto"
              >
                <option value="">All</option>
                <option value="FHAZ">Front Hazard Avoidance Camera</option>
                <option value="RHAZ">Rear Hazard Avoidance Camera</option>
                <option value="MAST">Mast Camera</option>
                <option value="CHEMCAM">Chemistry and Camera Complex</option>
                <option value="MAHLI">Mars Hand Lens Imager</option>
                <option value="MARDI">Mars Descent Imager</option>
                <option value="NAVCAM">Navigation Camera</option>
                <option value="PANCAM">Panoramic Camera</option>
                <option value="MINITES">Miniature Thermal Emission Spectrometer</option>
              </select>
            </div>
            <div class="w-full md:w-auto flex flex-col">
              <label for="earth-date" class="mb-2 text-white">Earth Date:</label>
              <input
                type="date"
                id="earth-date"
                v-model="earthDate"
                class="p-1 border rounded bg-gray-700 text-white w-full md:w-auto"
              />
            </div>
            <button
              @click="fetchRoverPhotos"
              class="px-4 py-2 bg-green-500 rounded hover:bg-green-400 transition-colors w-full md:w-auto mt-2 md:mt-0 md:ml-4"
            >
              Search
            </button>
          </div>
          <div class="mt-4 text-white" v-if="roverPhotos.length > 0">
            {{ roverName }} made {{ roverPhotos.length }} pictures on
            {{ DateHelper.formatDate(earthDate) }}.
          </div>
        </div>
      </div>
      <div v-if="loading" class="mt-2">Loading...</div>
      <div v-if="error" class="mt-2 text-red-500">{{ error.message }}</div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div
          v-for="photo in roverPhotos"
          :key="photo.id"
          class="bg-gray-800 bg-opacity-90 border-slate-50 text-green-500 p-4 rounded shadow-lg"
        >
          <img :src="photo.img_src" alt="Mars Rover Photo" class="w-full h-64 object-cover mb-4" />
          <h2 class="text-lg font-bold">Camera: {{ photo.camera.full_name }}</h2>
          <p>Earth Date: {{ photo.earth_date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getRoverPhotos } from '../helpers/api/apiRoutes'
import DateHelper from '../helpers/api/DateHelper'

const selectedRover = ref('curiosity')
const selectedCamera = ref('')
const earthDate = ref('')

const roverPhotos = ref([])
const loading = ref(false)
const error = ref(null)

const fetchRoverPhotos = async () => {
  loading.value = true
  error.value = null
  try {
    roverPhotos.value = await getRoverPhotos(
      selectedRover.value,
      earthDate.value,
      selectedCamera.value
    )
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

const route = useRoute()
const roverName = computed(() => route.params.roverName)
const roverImage = computed(() => {
  switch (roverName.value.toLowerCase()) {
    case 'curiosity':
      return new URL('../assets/images/curiosity-badge.jpg', import.meta.url).href
    case 'opportunity':
      return new URL('../assets/images/opportunity-badge.jpg', import.meta.url).href
    case 'spirit':
      return new URL('../assets/images/spirit-badge.jpg', import.meta.url).href
    default:
      return ''
  }
})
</script>

<style scoped>
.bg-mars-detail {
  background-image: url('../assets/images/mars-detail.jpg');
  background-size: cover;
  background-position: center;
}
img {
  width: 100%;
  height: auto;
}
</style>
