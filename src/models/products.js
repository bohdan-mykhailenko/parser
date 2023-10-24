const { findOrCreateCategory, insertProductData, insertOrUpdateCharacteristics } = require('../database/db');

async function insertProduct(product) {
  try {
    const categoryID = await findOrCreateCategory(product.category);
    const productID = await insertProductData(product.name, product.price, categoryID);

    await insertOrUpdateCharacteristics(product.characteristics, productID);
  } catch (error) {
    console.error('Error inserting data into the database: ' + error.message);
  }
}

module.exports = insertProduct;