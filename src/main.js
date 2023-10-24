const connection = require('./config/db.config');
const getParsedProducts = require('./helpers/getParsedProducts');
const insertProduct = require('./models/products');

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

storeData();