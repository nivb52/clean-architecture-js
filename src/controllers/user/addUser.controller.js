const { Response } = require("../../frameworks/common/Response");

module.exports = dependencies => {
    // add user
    return async function(req, res, next) {
        try {
            const { addUserUseCase } = dependencies.useCases.user;
            const addUserUseCaseAction = addUserUseCase(dependencies);
            
            const { body = {} } = req;
            const addedUser = await addUserUseCaseAction.execute(body);
            
            res.json(new Response({ status: true, content: addedUser, error: null }));
            next();
        } catch (err) {
            next(err)
        }
    }
}