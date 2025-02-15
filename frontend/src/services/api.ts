// Define the data structure for each item in the API response
export interface DataItem {
  name: string
  countrycode: string
  product: string
  date: string
  headline: string
}

const API_URL = 'https://www.fancensus.com/test/dataset1.json'

export const fetchData = async (): Promise<DataItem[]> => {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data: DataItem[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
