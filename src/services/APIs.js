import axios from 'axios';

const API_KEY = '38313648-79b021f85a9dd42156ef97952';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const defaultParams = {
  key: API_KEY,
  imageType: 'photo',
  per_page: 12,
  orientation: 'horizontal',
};

async function getImages({ query, page }) {
  const params = {
    ...defaultParams,
    q: query,
    page: page,
  };

  const response = await axios.get('', { params });

  return response.data;
}

export { getImages };
