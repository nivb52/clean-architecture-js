const { Product } = require("../../entities");

module.exports = (dependencies) => {
   const { productRepository } = dependencies;
   if (!productRepository) {
     throw new Error("Products Repository should be included in dependencies");
   }

  const execute = (productData) => {
    if (!productData.id) {
      throw new Error("User should have an id");
    }
    
    const updatedProduct = new Product(productData);
    return productRepository.update(updatedProduct);
  };

  return {
    execute,
  };
};
