const { Product } = require("../../entities");

module.exports = (dependencies) => {
  const { productRepository } = dependencies;
  if (!productRepository) {
    throw new Error("Products Repository should be included in dependencies");
  }

  const execute = (productData) => {
    const newProduct = new Product(productData);
    return productRepository.add(newProduct);
  };

  return {
    execute,
  };
};
