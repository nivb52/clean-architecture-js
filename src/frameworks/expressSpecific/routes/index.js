const express = require("express");
const usersRouter = require("./users");

const {Response} = require('../../common/Response')
const TEMP_NOT_FOUND = async function (req, res, next) {
  try {
    res.json(new Response({ status: true, content: 'not found', error: null }));
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = (dependencies) => {
  const routes = express.Router();
  const users = usersRouter(dependencies);
  routes.use("/users", users);
  routes.use("/*", TEMP_NOT_FOUND);
  return routes;  
};
