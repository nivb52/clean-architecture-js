const { Response } = require("../../frameworks/common/Response");

module.exports = (dependencies) => {
  // delete Product
  return async function (req, res, next) {
    try {
      const { deleteProductUseCase } = dependencies.useCases.Product;
      const deleteProductUseCaseAction = deleteProductUseCase(dependencies);

      const { body = {} } = req;
      const deletedProduct = await deleteProductUseCaseAction.execute(body);

      res.json(
        new Response({ status: true, content: deletedProduct, error: null })
      );
      next();
    } catch (err) {
      next(err);
    }
  };
};
