const axios = require('axios');
const cheerio = require('cheerio');
const mysql = require('mysql');
const parseCharacteristics = require('./helpers/parseCharacteristics')

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'admin',
  password: 'admin',
  database: 'store',
});

connection.connect();

const url = 'https://hotline.ua/ua/mobile/mobilnye-telefony-i-smartfony/?mode=series&sort=popularity';

const scrapeAndStoreData = async () => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const list = $('.list-body__content .list-item');

    list.each((index, element) => {
      const product = {
        name: $(element).find('.list-item__title').text(),
        description: "empty",
        price: parseFloat($(element).find('.price__value').text().replace(' ', '')),
        images: $(element).find('img').attr('src'),
      };

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
    console.error(error);
  } finally {
    connection.end();
  }
}

scrapeAndStoreData();
