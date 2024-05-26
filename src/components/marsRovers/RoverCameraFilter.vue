<template>
  <div class="flex flex-col md:flex-row gap-2">
    <div>
      <label for="camera" class="mr-2">Camera:</label>
      <select
        :value="selectedCamera"
        @change="updateCamera($event.target.value)"
        class="p-1 border rounded bg-gray-700 text-white"
      >
        <option value="">All</option>
        <option v-for="camera in filteredCameras" :key="camera.value" :value="camera.value">
          {{ camera.name }}
        </option>
      </select>
    </div>
    <div>
      <label for="earth-date" class="mr-2">Earth Date:</label>
      <input
        type="date"
        id="earth-date"
        :value="earthDate"
        @change="updateDate($event.target.value)"
        class="p-1 border rounded bg-gray-700 text-white"
      />
    </div>
    <button
      @click="$emit('search')"
      class="px-4 py-2 bg-green-500 rounded hover:bg-blue-700 transition-colors"
    >
      Search
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
  selectedRover: String,
  selectedCamera: String,
  earthDate: String
})

const emit = defineEmits(['updateCamera', 'updateDate', 'search'])

const cameras = {
  curiosity: [
    { value: 'FHAZ', name: 'Front Hazard Avoidance Camera' },
    { value: 'RHAZ', name: 'Rear Hazard Avoidance Camera' },
    { value: 'MAST', name: 'Mast Camera' },
    { value: 'CHEMCAM', name: 'Chemistry and Camera Complex' },
    { value: 'MAHLI', name: 'Mars Hand Lens Imager' },
    { value: 'MARDI', name: 'Mars Descent Imager' },
    { value: 'NAVCAM', name: 'Navigation Camera' }
  ],
  opportunity: [
    { value: 'FHAZ', name: 'Front Hazard Avoidance Camera' },
    { value: 'RHAZ', name: 'Rear Hazard Avoidance Camera' },
    { value: 'NAVCAM', name: 'Navigation Camera' },
    { value: 'PANCAM', name: 'Panoramic Camera' },
    { value: 'MINITES', name: 'Miniature Thermal Emission Spectrometer' }
  ],
  spirit: [
    { value: 'FHAZ', name: 'Front Hazard Avoidance Camera' },
    { value: 'RHAZ', name: 'Rear Hazard Avoidance Camera' },
    { value: 'NAVCAM', name: 'Navigation Camera' },
    { value: 'PANCAM', name: 'Panoramic Camera' },
    { value: 'MINITES', name: 'Miniature Thermal Emission Spectrometer' }
  ]
}

const filteredCameras = computed(() => {
  return cameras[props.selectedRover.toLowerCase()] || []
})

const updateCamera = (value: string) => {
  emit('updateCamera', value)
}

const updateDate = (value: string) => {
  emit('updateDate', value)
}
</script>

<style scoped></style>
