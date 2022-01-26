const { Response } = require("../../frameworks/common/Response");

module.exports = (dependencies) => {
  // add Product
  return async function (req, res, next) {
    try {
      const { addProductUseCase } = dependencies.useCases.Product;
      const addProductUseCaseAction = addProductUseCase(dependencies);

      const { body = {} } = req;
      const addedProduct = await addProductUseCaseAction.execute(body);

      res.json(
        new Response({ status: true, content: addedProduct, error: null })
      );
      next();
    } catch (err) {
      next(err);
    }
  };
};
