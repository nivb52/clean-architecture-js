
module.exports = (dependencies) => {
  const { productRepository } = dependencies;
  if (!productRepository) {
    throw new Error("Products Repository should be included in dependencies");
  }

  const execute = ({id}) => {
    if (!id) {
      throw new Error("Id param is miising");
    }
    return productRepository.getById(id);
  };

  return {
    execute,
  };
};
