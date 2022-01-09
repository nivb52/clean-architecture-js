const express = require("express");
const { userControllers } = require("../../../controllers/index");

module.exports = (dependencies) => {
  const router = express.Router();
  const {
    addUserController,
    updateUserController,
    deleteUserController,
    getUserByIdController,
  } = userControllers(dependencies);

  // router.get('/')
  router.get("/:id").get(getUserByIdController);
  router
    .route("/")
    .post(addUserController)
    .delete(deleteUserController)
        .put(updateUserController);
    
    return router;
};
