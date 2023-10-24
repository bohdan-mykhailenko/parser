const { queryDatabase } = require('./database/operations');

async function filterProductsByCategory(category) {
  const query = `
    SELECT products.*
    FROM products
    JOIN categories ON products.category_id = categories.id
    WHERE categories.name = ?;
  `;
  const results = await queryDatabase(query, [category]);
  return results;
}
async function filterProductsByPriceRange(minPrice, maxPrice) {
  const query = 'SELECT * FROM products WHERE price >= ? AND price <= ?';
  const results = await queryDatabase(query, [minPrice, maxPrice]);

  return results;
}

async function filterProductsByCharacteristic(characteristicName, characteristicValue) {
  const query = `
    SELECT products.*
    FROM products
    JOIN product_characteristics ON products.id = product_characteristics.product_id
    JOIN characteristics ON product_characteristics.characteristic_id = characteristics.id
    WHERE characteristics.name = ? AND product_characteristics.value = ?;
  `;
  const results = await queryDatabase(query, [characteristicName, characteristicValue]);

  return results;
}

module.exports = {
  filterProductsByCategory, filterProductsByCharacteristic, filterProductsByPriceRange
}