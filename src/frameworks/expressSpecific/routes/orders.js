const express = require("express");
const { orderControllers } = require("../../../controllers/index");

module.exports = (dependencies) => {
  const router = express.Router();
  const {
    addOrderController,
    updateOrderController,
    deleteOrderController,
    getOrderByIdController,
  } = orderControllers(dependencies);

  // router.get('/')
  router.get("/:id").get(getOrderByIdController);
  router
    .route("/")
    .post(addOrderController)
    .delete(deleteOrderController)
    .put(updateOrderController);
    
    return router;
};
