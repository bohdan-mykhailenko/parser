const connection = require('./database/connection');
const getParsedProducts = require('./parser/getParsedProducts');

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

async function insertProduct(product) {
  try {
    // Check if the category already exists
    const category = product.category;
    const getCategoryIDQuery = 'SELECT id FROM categories WHERE name = ?';
    const [categoryRow] = await queryDatabase(getCategoryIDQuery, [category]);

    let categoryID;
    if (categoryRow) {
      // Category already exists
      categoryID = categoryRow.id;
    } else {
      // Category doesn't exist, so insert a new record
      const categoryInsertQuery = 'INSERT INTO categories (name) VALUES (?)';
      const categoryInsertResult = await queryDatabase(categoryInsertQuery, [category]);

      categoryID = categoryInsertResult.insertId;
    }

    // Insert the product into the products table
    const productQuery = 'INSERT INTO products (name, price, category_id) VALUES (?, ?, ?)';

    await queryDatabase(productQuery, [product.name, product.price, categoryID]);

    // Retrieve the product ID
    const getProductIDQuery = 'SELECT id FROM products WHERE name = ?';
    const [productRow] = await queryDatabase(getProductIDQuery, [product.name]);
    const productID = productRow.id;

    // Insert or update characteristics
    for (const characteristic of product.characteristics) {
      const { name, value } = characteristic;

      // Check if the characteristic already exists
      const getCharIDQuery = 'SELECT id FROM characteristics WHERE name = ?';
      const [charRow] = await queryDatabase(getCharIDQuery, [name]);

      let charID;
      if (charRow) {
        // Characteristic already exists
        charID = charRow.id;
      } else {
        // Characteristic doesn't exist, so insert a new record
        const charInsertQuery = 'INSERT INTO characteristics (name) VALUES (?)';
        const charInsertResult = await queryDatabase(charInsertQuery, [name]);

        charID = charInsertResult.insertId;
      }

      // Insert the product characteristic
      const productCharQuery = 'INSERT INTO product_characteristics (product_id, characteristic_id, value) VALUES (?, ?, ?)';

      await queryDatabase(productCharQuery, [productID, charID, value]);
    }
  } catch (error) {
    console.error('Error inserting data into the database: ' + error.message);
  }
}

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