module.exports.User = class User {
  constructor({
    id,
    name = "",
    lastName = "",
    email = '',
    gender = genders.NOT_SPECIFIED,
    meta = {},
  }) {
    this.id = id;
    this.name = name.trim();
    this.lastName = lastName.trim();
    this.email = email.trim();
    this.gender = gender;
    this.meta = meta;
  }
};

const genders = {
  NOT_SPECIFIED: 0,
  FEMALE: 1,
  MALE: 2,
};

module.exports.userConstants = { genders };
