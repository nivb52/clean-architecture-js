const { randomUUID } = require("crypto");
const { inMemory: inMemoryDb } = require("../../database");


const _getById = async (productId) => {
  const productFromDb = inMemoryDb.products.find((u) => u.id === productId);
  return productFromDb;
};

const _getIndexById = async (productId) => {
  const userFromDbIndex = inMemoryDb.products.findIndex((u) => u.id === productId);
  return userFromDbIndex;
};

module.exports = {
  add: async (product) => {
    if (!product.id) {
      product.id = randomUUID();
    }
    inMemoryDb.products.push(product);
    return Object.assign({}, product);
  },
  update: async (product) => {
    let productRecord = await _getById(product.id);
    if (!productRecord) {
      return null;
    }
    productRecord = Object.assign(productRecord, product);
    return Object.assign({}, productRecord);
  },

  delete: async (productId) => {
    const productIndex = await _getIndexById(productId);
    if (typeof productIndex !== "number" || productIndex < 0) {
      return null;
    }
    inMemoryDb.products.splice(productIndex, 1);
    return {};
  },
  getById: async (productId) => {
    if (!productId) {
      return null;
    }
    const productFromDb = await _getById(productId);
    if (!productFromDb) {
      return null;
    }
    return Object.assign({}, productFromDb);
  },
};
