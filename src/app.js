const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const API_PREFIX = process.env.API_PREFIX || "/api/v1";

const dependencies = require("./config/dependencies");
const routes = require("../src/frameworks/expressSpecific/routes");

module.exports = {
  start: () => {
    // middleware
    app.use(express.json()); 
    app.use(express.urlencoded({ extended: true }));

    // Routes
    // @todo add dependencies to the file
    app.use(API_PREFIX, routes(dependencies));
    // Common Erro hnadler

    app.listen(PORT, () => console.log("app running on port: ", PORT));
  },
};
