import axios from 'axios'

const API_KEY = 'lLoqsgJ7Gc6swjd82rCuGRJH4Frv9YKU3D2AuEpm'

const nasaApiClient = axios.create({
  baseURL: 'https://api.nasa.gov'
})

export const getPictureOfTheDay = async () => {
  try {
    const response = await nasaApiClient.get('/planetary/apod?api_key=' + API_KEY)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const getNearEarthObjects = async (startDate: string, endDate: string) => {
  try {
    const response = await nasaApiClient.get(
      `/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
