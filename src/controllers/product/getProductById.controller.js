const { Response } = require("../../frameworks/common/Response");

module.exports = (dependencies) => {
  // get by id Product
  return async function (req, res, next) {
    try {
      const { getProductByIdUseCase } = dependencies.useCases.Product;
      const getProductByIdUseCaseAction = getProductByIdUseCase(dependencies);

      const { params = {} } = req;
      const Product = await getProductByIdUseCaseAction.execute(params.id);

      res.json(new Response({ status: true, content: Product, error: null }));
      next();
    } catch (err) {
      next(err);
    }
  };
};
