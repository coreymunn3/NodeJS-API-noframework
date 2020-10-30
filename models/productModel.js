let products = require('../data/products');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils/utils');

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === id);
    resolve(product);
  });
}

function create(product) {
  return new Promise((resolve, reject) => {
    // create new product with random ID
    const newProduct = { id: uuidv4(), ...product };
    // add new product to the array
    products.push(newProduct);
    // write it to the file
    writeDataToFile('./data/products.json', products);
    // send the new product as a response
    resolve(newProduct);
  });
}

function update(id, product) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => p.id === id);
    products[index] = { id, ...product };
    // write it to the file
    writeDataToFile('./data/products.json', products);
    // send the new product as a response
    resolve(products[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    // filter out product to remove based on ID
    products = products.filter((p) => p.id !== id);
    // write it to the file
    writeDataToFile('./data/products.json', products);
    // send the new product as a response
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
