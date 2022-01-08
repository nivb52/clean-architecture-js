const { User } = require("../../entities");

module.exports = (dependencies) => {
  const { userRepository } = dependencies;
  if (!userRepository) {
    throw new Error("Users Repository should be included in dependencies");
  }

  const execute = (userData) => {
    if (!userData.id) {
      throw new Error("User should have an id");
    }

    const updatedUserData = new User(userData);
    return userRepository.update(updatedUserData);
  };

  return {
    execute,
  };
};
