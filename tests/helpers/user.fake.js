const {
  User,
  constants: { userConstants },
} = require("../../src/entities/index");

const userGender = (randInt) =>
  randInt === 2
    ? userConstants.genders.MALE
    : randInt === 1
    ? userConstants.genders.FEMALE
    : userConstants.genders.NOT_SPECIFIED;

module.exports = (chance) =>
  new User({
    name: chance.name(),
    lastName: chance.last(),
    gender: userGender(chance.integer({ min: 0, max: 2 })),
    meta: { hair: { color: chance.color() } },
  });
