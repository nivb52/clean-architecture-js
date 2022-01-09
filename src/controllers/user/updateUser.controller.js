const { Response } = require("../../frameworks/common/Response");

module.exports = (dependencies) => {
  // update user
  return async function (req, res, next) {
    try {
      const { updateUserUseCase } = dependencies.useCases.user;
      const updateUserUseCaseAction = updateUserUseCase(dependencies);

          const { body = {} } = req;
      const updatedUser = await updateUserUseCaseAction.execute(body);

      res.json(new Response({ status: true, content: updatedUser, error: null }));
      next();
    } catch (err) {
      next(err);
    }
  };
};
