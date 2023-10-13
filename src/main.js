const cheerio = require('cheerio');
const connection = require('./database/connection');
const { fetchProducts } = require('./api/products');
const parseCharacteristics = require('./helpers/parseCharacteristics');

const scrapeAndStoreData = async () => {
  try {
    const htmlData = await fetchProducts();
    const $ = cheerio.load(htmlData);
    const productItem = $('.list-item');

    productItem.each((index, element) => {
      const product = {};

      const name = $(element).find('.list-item__title').text();
      const description = "empty";
      const price = Number($(element).find('.price__value').text().replace(/\D/g, ''))

      const image = $(element).find('img').attr('src');

      product.name = name
      product.description = description;
      product.price = price;
      product.image = image;

      const characteristics = $(element).find('.list-item__specifications-text').text();
      const parsedCharacteristics = parseCharacteristics(characteristics);

      product.general = parsedCharacteristics.general;
      product.screen_resolution = parsedCharacteristics.screen_resolution;
      product.screen_type = parsedCharacteristics.screen_type;
      product.processor = parsedCharacteristics.processor;
      product.os = parsedCharacteristics.os;
      product.accumulator = parsedCharacteristics.accumulator;
      product.camera = parsedCharacteristics.camera;
      product.nfc = parsedCharacteristics.nfc;

      connection.query('INSERT INTO products SET ?', product, (error, results) => {
        if (error) {
          console.error(error);
        } else {
          console.log(`Inserted product with ID: ${results.insertId}`);
        }
      });
    });
  } catch (error) {
    throw new Error(error);
  } finally {
    connection.end();
  }
}

scrapeAndStoreData();
