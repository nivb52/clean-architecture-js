const { Response } = require("../../frameworks/common/Response");

module.exports = (dependencies) => {
  // delete  user
  return async function (req, res, next) {
    try {
      const { deleteUserUseCase } = dependencies.useCases.user;
      const deleteUserUseCaseAction = deleteUserUseCase(dependencies);

      const { body = {} } = req;
      const deletedUser = await deleteUserUseCaseAction.execute(body);

      res.json(
        new Response({ status: true, content: deletedUser, error: null })
      );
      next();
    } catch (err) {
      next(err);
    }
  };
};
