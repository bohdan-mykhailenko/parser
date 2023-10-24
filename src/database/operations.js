const connection = require('../config/db.config');

function queryDatabase(query, values) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function endDatabaseConnection() {
  connection.end();
}

async function findOrCreateCategory(categoryName) {
  const getCategoryIDQuery = 'SELECT id FROM categories WHERE name = ?';
  const [categoryRow] = await queryDatabase(getCategoryIDQuery, [categoryName]);

  if (categoryRow) {
    return categoryRow.id;
  } else {
    const categoryInsertQuery = 'INSERT INTO categories (name) VALUES (?)';
    const categoryInsertResult = await queryDatabase(categoryInsertQuery, [categoryName]);

    return categoryInsertResult.insertId;
  }
}

async function findOrCreateCharacteristic(characteristicName) {
  const getCharIDQuery = 'SELECT id FROM characteristics WHERE name = ?';
  const [charRow] = await queryDatabase(getCharIDQuery, [characteristicName]);

  if (charRow) {
    return charRow.id;
  } else {
    const charInsertQuery = 'INSERT INTO characteristics (name) VALUES (?)';
    const charInsertResult = await queryDatabase(charInsertQuery, [characteristicName]);

    return charInsertResult.insertId;
  }
}

async function insertOrUpdateCharacteristics(characteristics, productID) {
  for (const characteristic of characteristics) {
    const { name, value } = characteristic;
    const charID = await findOrCreateCharacteristic(name);

    await insertProductCharacteristic(productID, charID, value);
  }
}

async function insertProductCharacteristic(productID, characteristicID, value) {
  const productCharQuery = 'INSERT INTO product_characteristics (product_id, characteristic_id, value) VALUES (?, ?, ?)';

  await queryDatabase(productCharQuery, [productID, characteristicID, value]);
}

async function insertProductCharacteristic(productID, characteristicID, value) {
  const productCharQuery = 'INSERT INTO product_characteristics (product_id, characteristic_id, value) VALUES (?, ?, ?)';

  await queryDatabase(productCharQuery, [productID, characteristicID, value]);
}

async function insertProductData(productName, productPrice, productImage, categoryID) {
  const productQuery = 'INSERT INTO products (name, price, image, category_id) VALUES (?, ?, ?, ?)';
  const productInsertResult = await queryDatabase(productQuery, [productName, productPrice, productImage, categoryID]);

  return productInsertResult.insertId;
}

module.exports = {
  queryDatabase,
  findOrCreateCategory,
  insertProductData,
  insertOrUpdateCharacteristics,
  endDatabaseConnection
};