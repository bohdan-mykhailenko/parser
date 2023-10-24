const connection = require('./config/db.config');
const getParsedProducts = require('./helpers/getParsedProducts');
const insertProduct = require('./models/products');
const {
  filterProductsByCategory,
  filterProductsByPriceRange,
  filterProductsByCharacteristic
} = require('./filter');

async function storeData() {
  try {
    const products = await getParsedProducts();
    for (const product of products) {
      await insertProduct(product);
    }
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
}

async function getFilteredData() {
  try {
    const productsByCategory = await filterProductsByCategory('mobile');
    const productsByPriceRange = await filterProductsByPriceRange(20000, 25000);
    const productsByCharacteristic = await filterProductsByCharacteristic('screen_resolution', '6,8"')

    console.log(productsByCategory);
    console.log(productsByPriceRange);
    console.log(productsByCharacteristic);
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
}

storeData();

// getFilteredData();





