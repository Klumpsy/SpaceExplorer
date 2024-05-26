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

export const getRoverPhotos = async (rover, earthDate, camera) => {
  let url = `/mars-photos/api/v1/rovers/${rover}/photos?api_key=${API_KEY}`

  if (earthDate) {
    url += `&earth_date=${earthDate}`
  }
  if (camera) {
    url += `&camera=${camera}`
  }

  try {
    const response = await nasaApiClient.get(url)
    console.log(response.data.photos)
    return response.data.photos
  } catch (error) {
    console.error('Error fetching rover photos:', error)
    throw error
  }
}
