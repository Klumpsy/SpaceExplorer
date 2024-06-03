<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getNearEarthObjects } from '../helpers/api/apiRoutes'
import type { NearEarthObject } from '../definitions/interface/NearEarthObject'
import { format, subDays } from 'date-fns'
import NearEarthObjectFilter from '../components/nearEarthObjects/NearEarthObjectFilter.vue'
import DateHelper from '../helpers/api/DateHelper'
import type { NearEarthObjectFilterChangePayload } from '../definitions/interface/NearEarthObjectFilterChangePayload'

const startDate = ref(format(subDays(new Date(), 1), 'yyyy-MM-dd'))
const endDate = ref(format(new Date(), 'yyyy-MM-dd'))

const nearEarthObjects = ref<NearEarthObject[]>([])
const loading = ref(false)
const error = ref<unknown | null>(null)

async function fetchData() {
  loading.value = true
  error.value = null
  try {
    const response = await getNearEarthObjects(startDate.value, endDate.value)
    const objectsArray = Object.values(response.near_earth_objects).flat(1)
    nearEarthObjects.value = objectsArray as NearEarthObject[]
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

const applyFilters = (filters: NearEarthObjectFilterChangePayload) => {
  fetchData().then(() => {
    let filteredData = [...nearEarthObjects.value]
    if (filters.maxMagnitude) {
      filteredData = filteredData.filter((obj) => obj.absolute_magnitude_h <= filters.maxMagnitude)
    }
    if (filters.minDiameter) {
      filteredData = filteredData.filter(
        (obj) => obj.estimated_diameter.meters.estimated_diameter_max >= filters.minDiameter
      )
    }
    if (filters.maxDiameter) {
      filteredData = filteredData.filter(
        (obj) => obj.estimated_diameter.meters.estimated_diameter_max <= filters.maxDiameter
      )
    }
    if (filters.isHazardous !== '') {
      const hazardousBool = filters.isHazardous === 'true'
      filteredData = filteredData.filter(
        (obj) => obj.is_potentially_hazardous_asteroid === hazardousBool
      )
    }
    nearEarthObjects.value = filteredData
  })
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="bg-black min-h-screen text-white">
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-4 text-green-500">Near Earth Objects</h1>
      <div class="flex flex-col md:flex-row gap-2 mb-4">
        <div class="w-full md:w-auto">
          <label for="start-date" class="mr-2">Start Date:</label>
          <input
            type="date"
            id="start-date"
            v-model="startDate"
            class="p-1 border rounded bg-gray-700 text-white w-full md:w-auto"
          />
        </div>
        <div class="w-full md:w-auto">
          <label for="end-date" class="mr-2">End Date:</label>
          <input
            type="date"
            id="end-date"
            v-model="endDate"
            class="p-1 border rounded bg-gray-700 text-white w-full md:w-auto"
          />
        </div>
        <button
          @click="fetchData"
          class="px-4 py-2 bg-green-500 rounded hover:bg-blue-700 transition-colors w-full md:w-auto"
        >
          Search
        </button>
      </div>
      <NearEarthObjectFilter @filter-change="applyFilters" />
      <div v-if="loading" class="mt-2">Loading...</div>
      <div v-if="error" class="mt-2 text-red-500">{{ error.message }}</div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div
          v-for="object in nearEarthObjects"
          :key="object.id"
          class="bg-white text-black p-4 rounded shadow-lg relative"
          :class="{
            'border-4 border-red-500': object.is_potentially_hazardous_asteroid,
            'border-4 border-green-500': !object.is_potentially_hazardous_asteroid
          }"
        >
          <span class="text-green-700 text-xs absolute top-2 right-2">
            {{
              object.close_approach_data[0]
                ? DateHelper.formatDate(object.close_approach_data[0].close_approach_date)
                : 'N/A'
            }}
          </span>

          <h2 class="text-lg font-bold">Name: {{ object.name }}</h2>
          <p>Absolute Magnitude: {{ object.absolute_magnitude_h }}</p>
          <p>
            Missed earth by:
            {{
              Math.round(object.close_approach_data[0].miss_distance.kilometers).toLocaleString(
                'En-en'
              )
            }}
            km
          </p>
          <p>
            Object diameter:
            {{ Math.round(object.estimated_diameter.meters.estimated_diameter_max) }} m
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
