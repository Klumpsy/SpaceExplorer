<script setup lang="ts">
import { ref, watch } from 'vue'
import { FilterChangeType } from '../../definitions/type/FilterChangeType'

const minDiameter = ref<number>(0)
const maxDiameter = ref<number>(0)
const isHazardous = ref<boolean>(false)
const maxMagnitude = ref<number>(0)

const emit: FilterChangeType = defineEmits(['filter-change'])

const emitFilterChange = () => {
  emit('filter-change', {
    minDiameter: minDiameter.value,
    maxDiameter: maxDiameter.value,
    isHazardous: isHazardous.value,
    maxMagnitude: maxMagnitude.value
  })
}

watch([minDiameter, maxDiameter, isHazardous, maxMagnitude], () => {
  emitFilterChange()
})
</script>

<template>
  <div class="filters flex flex-col md:flex-row gap-4 p-4 bg-gray-800 text-white rounded-lg shadow">
    <div class="flex flex-col">
      <label for="min-diameter" class="mb-2">Min absolute magnitude:</label>
      <input
        type="number"
        id="magnitude"
        v-model.number="maxMagnitude"
        class="input bg-gray-700 border border-gray-600 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 rounded p-2"
      />
    </div>
    <div class="flex flex-col">
      <label for="min-diameter" class="mb-2">Min Diameter (m):</label>
      <input
        type="number"
        id="min-diameter"
        v-model.number="minDiameter"
        class="input bg-gray-700 border border-gray-600 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 rounded p-2"
      />
    </div>
    <div class="flex flex-col">
      <label for="max-diameter" class="mb-2">Max Diameter (m):</label>
      <input
        type="number"
        id="max-diameter"
        v-model.number="maxDiameter"
        class="input bg-gray-700 border border-gray-600 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 rounded p-2"
      />
    </div>
    <div class="flex flex-col">
      <label for="hazardous" class="mb-2">Potentially Hazardous:</label>
      <select
        id="hazardous"
        v-model="isHazardous"
        class="bg-gray-700 border border-gray-600 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 rounded p-2"
      >
        <option value="">All</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>
  </div>
</template>
