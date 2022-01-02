const {randomUUID} = require("crypto");
const { inMemory : inMemoryDb } = require("../../database");

const _getUserId = (userOrUserId) =>
  userOrUserId && typeof userOrUserId === "object"
    ? userOrUserId.id
    : userOrUserId;

const _getById = async (userId) => {
  const userFromDb = inMemoryDb.users.find((u) => u.id === userId);
  return userFromDb;
};

const _getIndexById = async (userId) => {
  const userFromDbIndex = inMemoryDb.users.findIndex((u) => u.id === userId);
  return userFromDbIndex;
};

module.exports = {
  add: async (user) => {
    if (!user.id) {
      user.id = randomUUID();
    }
    inMemoryDb.users.push(user);
    return Object.assign({}, user);
  },
  update: async (updatedUser) => {
    let userRecord = await _getById(updatedUser.id);
    if (!userRecord) {
      return null;
    }
    userRecord = Object.assign(userRecord, updatedUser);
    return Object.assign({}, userRecord);
  },

  delete: async (UserId) => {
    const userIndex = await _getIndexById(UserId);
    if (typeof userIndex !== 'number' || userIndex < 0) {
      return null;
    }
    inMemoryDb.users.splice(userIndex, 1);
    return {};
  },
  getById: async (userId) => {
    if (!userId) {
      return null;
    }
    const userFromDb = await _getById(userId);
    if (!userFromDb) {
      return null;
    }
    return Object.assign({}, userFromDb);
  },

};
