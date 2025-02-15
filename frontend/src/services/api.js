import axios from 'axios';

const API_URL = 'https://www.fancensus.com/test/dataset1.json';

export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};