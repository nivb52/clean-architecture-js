// @todo:
// const { User, constants } = require( "@entities/index.js");
const {
  User,
  constants: { userConstants },
} = require("../../../entities/");
const userRepository = require("./userReposetoriy");
const chance = require("../../../../tests/helpers/common");
const createTestUser = () => chance.user();

describe("User repository", () => {
  test("New User should be added and returned", async () => {
    const testUser = createTestUser();
    const addUser = await userRepository.add(testUser);

    expect(addUser).toBeDefined();
    expect(addUser.id).toBeDefined();
    expect(addUser.name).toBe(testUser.name);
    expect(addUser.lastName).toBe(testUser.lastName);
    expect(addUser.gender).toBe(testUser.gender);
    expect(addUser.meta).toEqual(testUser.meta);
  });

  test("New User should be findable in db", async () => {
    const testUser = createTestUser();
    const addUser = await userRepository.add(testUser);
    const foundUser = await userRepository.getById(addUser.id);
    expect(foundUser).toEqual(testUser);
  });

  test("User should be deleted & empty object should be returned", async () => {
    // init 2 users & delete one  user & test
    const [presistUser, shouldDeleteUser] = await Promise.all([
      userRepository.add(createTestUser()),
      userRepository.add(createTestUser()),
    ]);

    const deleteUserResult = await userRepository.delete(shouldDeleteUser.id);
    expect(deleteUserResult).toEqual({});

    const foundDeletedUser = await userRepository.getById(shouldDeleteUser.id);
    expect(foundDeletedUser).toBeNull();
    
    const foundPresistedUser = await userRepository.getById(presistUser.id);
    expect(foundPresistedUser).toEqual(presistUser);
  });

  test("User should be updated & user object should be returned", async () => {
    const updateUser = await userRepository.add(createTestUser());
    const name = chance.name();
    updateUser.name = name;
    const updateUserResult = await userRepository.update(updateUser);

    expect(updateUserResult).toEqual(updateUser);
    expect(updateUserResult.name).toEqual(name);
  });
});
