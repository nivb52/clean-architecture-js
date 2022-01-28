const { Response } = require("../../frameworks/common/Response");

module.exports = (dependencies) => {
  // get by id user
  return async function (req, res, next) {
    try {
      const { getUserByIdUseCase } = dependencies.useCases.user;
      const getUserByIdUseCaseAction = getUserByIdUseCase(dependencies);

      const { params = {} } = req;
      const user = await getUserByIdUseCaseAction.execute(params.id);

      res.json(
        new Response({ status: true, content: user, error: null })
      );
      next();
    } catch (err) {
      next(err);
    }
  };
};
