const axios = require('axios');
const url = require('../consts/api-url');

const fetchProducts = async () => {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { fetchProducts };