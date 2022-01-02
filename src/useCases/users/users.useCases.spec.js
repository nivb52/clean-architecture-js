const { randomUUID } = require("crypto");
const Chance = require("chance");
const chance = new Chance();

// const { User, userConstants } = require("../../entities/User");
const { user: {addUserUseCase, getUserByIdUseCase, updateUserUseCase }} = require("../index");
const { userRepository } = require("../../frameworks/reposetories/inMemory/");
const fakeUserFactory = require("../../../tests/helpers/user.fake");
const createTestUser = () => fakeUserFactory(chance);

const mockUserRepo = {
  add: jest.fn(async (user) => ({
    ...user,
    id: randomUUID(),
  })),
  getById: jest.fn(async (id) => {
    const user = createTestUser();
    user.id = id;
    console.log(user);
    return user;
  }),
  update: jest.fn(async (user) => Object.assign({}, user)
  ),
};

const dependencies = {
  userRepository: mockUserRepo,
};

describe("User use cases", () => {
  test("Add user use case", async () => {
    // create a user data
    const newUser = createTestUser();
    // add a user using the use case
    const addedUser = await addUserUseCase(dependencies).execute(newUser);

    expect(addedUser.id).toBeDefined();
    expect(addedUser.name).toBe(newUser.name);

    // check that the dependencies called as expected
    const invokedFunctionArguments = mockUserRepo.add.mock.calls[0][0];
    expect(invokedFunctionArguments.id).toBeUndefined();
    expect(invokedFunctionArguments.name).toBe(newUser.name);
  });
  test("get user by id use case", async () => {
    const id = randomUUID();
    const foundUser = await getUserByIdUseCase(dependencies).execute({id});

    expect(foundUser.id).toBe(id);
    expect(foundUser.name).toBeDefined();
    expect(foundUser.lastName).toBeDefined();
    expect(foundUser.gender).toBeDefined();
    expect(foundUser.meta).toBeDefined();

    // check that the dependencies called as expected
    const expectedId = mockUserRepo.getById.mock.calls[0][0];
    expect(expectedId).toBe(id);
  });

    test("Update user (by id) use case", async () => {
      // create a user data
      const userData = createTestUser();
      userData.id = randomUUID();
      // call update a user
      const updatededUser = await updateUserUseCase(dependencies).execute(
        userData
      );

      // check the result
      for (let key in userData) {
        expect(updatededUser[key]).toBe(userData[key]);
      }

      // check that the dependencies called as expected
      const invokedFunctionArguments = mockUserRepo.update.mock.calls[0][0];
      expect(invokedFunctionArguments).toBe(userData);
    });
});
