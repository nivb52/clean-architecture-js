const addUserUseCase = require("./users/addUser.useCase");
const updateUserUseCase = require("./users/updateUser.useCase");
const deleteUserUseCase = require("./users/deleteUser.useCase");
const getUserByIdUseCase = require("./users/getUserById.useCase");

module.exports = {
  user: { addUserUseCase, getUserByIdUseCase, updateUserUseCase, deleteUserUseCase },
};