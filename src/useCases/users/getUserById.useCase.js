
module.exports = (dependencies) => {
  const { userRepository } = dependencies;
  if (!userRepository) {
    throw new Error("Users Repository should be included in dependencies");
  }

  const execute = ({id}) => {
    if (!id) {
      throw new Error("Id param is missing");
    }
    return userRepository.getById(id);
  };

  return {
    execute,
  };
};
 