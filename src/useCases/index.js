const addUserUseCase = require("./users/addUser.useCase");
const updateUserUseCase = require("./users/updateUser.useCase");
const deleteUserUseCase = require("./users/deleteUser.useCase");
const getUserByIdUseCase = require("./users/getUserById.useCase");

const addProductUseCase = require("./products/addProduct.useCase");
const updateProductUseCase = require("./products/updateProduct.useCase");
const deleteProductUseCase = require("./products/deleteProduct.useCase");
const getProductByIdUseCase = require("./products/getProductById.useCase");

module.exports = {
  user: {
    addUserUseCase,
    getUserByIdUseCase,
    updateUserUseCase,
    deleteUserUseCase,
  },
  product: {
    addProductUseCase,
    updateProductUseCase,
    deleteProductUseCase,
    getProductByIdUseCase,
  },
};