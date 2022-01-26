const { Response } = require("../../frameworks/common/Response");

module.exports = (dependencies) => {
  // update Product
  return async function (req, res, next) {
    try {
      const { updateProductUseCase } = dependencies.useCases.Product;
      const updateProductUseCaseAction = updateProductUseCase(dependencies);

      const { body = {} } = req;
      const updatedProduct = await updateProductUseCaseAction.execute(body);

      res.json(
        new Response({ status: true, content: updatedProduct, error: null })
      );
      next();
    } catch (err) {
      next(err);
    }
  };
};
