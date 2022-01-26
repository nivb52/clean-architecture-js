const express = require("express");
const { prodcutControllers } = require("../../../controllers/index");

module.exports = (dependencies) => {
  const router = express.Router();
  const {
    addProductController,
    updateProductController,
    deleteProductController,
    getProductByIdController,
  } = prodcutControllers(dependencies);

  // router.get('/')
  router.get("/:id").get(getProductByIdController);
  router
    .route("/")
    .post(addProductController)
    .delete(deleteProductController)
    .put(updateProductController);
    
    return router;
};
