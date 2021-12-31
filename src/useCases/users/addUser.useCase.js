const { User } = require('../../entities');

module.exports = dependencies => {

    const { userRepository } = dependencies;
    if (!userRepository) {
        throw new Error('Users Repository should be included in dependencies')
    }

    const execute = (userData) => {
        const newUser = new User(userData);
        return userRepository.add(newUser)
    }

    return {
        execute
    }
}