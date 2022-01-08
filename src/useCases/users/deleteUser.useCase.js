
module.exports = (dependencies) => {
  const { userRepository } = dependencies;
  if (!userRepository) {
    throw new Error("Users Repository should be included in dependencies");
  }

  const execute = (userData) => {
    if (!userData.id) {
      throw new Error("User should have an id");
    }
    
    return userRepository.delete(userData);
  };

  return {
    execute,
  };
};
