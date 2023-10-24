const cheerio = require('cheerio');
const { fetchProducts } = require('../api/products');
const url = require('../consts/api-url');
const parseCharacteristics = require('./parseCharacteristics');
const getCategoryName = require('./getCategoryName');

const getParsedProducts = async () => {
  try {
    const htmlData = await fetchProducts(url);
    const $ = cheerio.load(htmlData);
    const productItem = $('.list-item');
    const products = [];

    productItem.each((index, element) => {
      const product = {};

      const name = $(element).find('.list-item__title').text().trim();
      const description = "empty";
      const price = Number($(element).find('.price__value').text().replace(/\D/g, ''))
      const image = $(element).find('img').attr('src');

      product.name = name
      product.description = description;
      product.price = price;
      product.image = image;

      const characteristics = $(element).find('.list-item__specifications-text').text();
      const parsedCharacteristics = parseCharacteristics(characteristics);

      product.characteristics = [
        { name: 'screen_resolution', value: parsedCharacteristics.screen_resolution || 'DefaultResolution' },
        { name: 'screen_type', value: parsedCharacteristics.screen_type || 'DefaultType' },
        { name: 'processor', value: parsedCharacteristics.processor || 'DefaultProcessor' },
        { name: 'os', value: parsedCharacteristics.os || 'DefaultOS' },
        { name: 'accumulator', value: parsedCharacteristics.accumulator || 'DefaultAccumulator' },
        { name: 'camera', value: parsedCharacteristics.camera || 'DefaultCamera' },
        { name: 'nfc', value: parsedCharacteristics.nfc || 'DefaultNFC' },
      ];
      const category = getCategoryName(url);
      product.category = category;

      products.push(product);
    });

    return products;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = getParsedProducts;