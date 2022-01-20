const express = require("express");
const usersRouter = require("./users");
const productsRouter = require("./products");
// const ordersRouter = require("./orders");


const errorNotFound = require('../ErrorNotFound')
module.exports = (dependencies) => {
  const routes = express.Router();
  const users = usersRouter(dependencies);
  routes.use("/users", users);
  routes.use("/products", productsRouter(dependencies));
  // routes.use("/orders", ordersRouter);
  
  routes.use("/*", errorNotFound);
  
  return routes;
};