const useCases = require("../useCases/index");
const reposetories = require("../frameworks/reposetories/inMemory");
module.exports = {
  useCases,
  ...reposetories,
};
