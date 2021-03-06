const { randomUUID } = require("crypto");
const {
  user: {
    addUserUseCase,
    getUserByIdUseCase,
    updateUserUseCase,
    deleteUserUseCase,
  },
} = require("../index");
const chance = require("../../../tests/helpers/common");
const createTestUser = () => chance.user();

const mockUserRepo = {
  add: jest.fn(async (user) => ({
    ...user,
    id: randomUUID(),
  })),
  getById: jest.fn(async (id) => {
    const user = createTestUser();
    user.id = id;
    return user;
  }),
  update: jest.fn(async (user) =>
    user.id ? Object.assign({}, user) : new Error("id is missing")
  ),
  delete: jest.fn(async (user) => (user.id ? {} : new Error("id is missing"))),
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
    expect(addedUser.email).toBe(newUser.email);

    // check that the dependencies called as expected
    const invokedFunctionArguments = mockUserRepo.add.mock.calls[0][0];
    expect(invokedFunctionArguments.id).toBeUndefined();
    expect(invokedFunctionArguments.name).toBe(newUser.name);
    expect(invokedFunctionArguments.email).toBe(newUser.email);
  });
  test("get user by id use case", async () => {
    const id = randomUUID();
    const foundUser = await getUserByIdUseCase(dependencies).execute({id});

    expect(foundUser.id).toMatch(id);
    expect(foundUser.name).toBeDefined();
    expect(foundUser.lastName).toBeDefined();
    expect(foundUser.email).toBeDefined();
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
      expect(updatededUser).toEqual(userData);

      // check that the dependencies called as expected
      const invokedFunctionArguments = mockUserRepo.update.mock.calls[0][0];
      expect(invokedFunctionArguments).toStrictEqual(userData);
    });
  
   test("Delete user (by id) use case", async () => {
     // create a user data
     const userData = createTestUser();
     userData.id = randomUUID();
     // call delete a user
     const deletedUser = await deleteUserUseCase(dependencies).execute(
       userData
     );

     // check the result
     expect(deletedUser).toStrictEqual({});

     // check that the dependencies called as expected
     const invokedFunctionArguments = mockUserRepo.delete.mock.calls[0][0];
     expect(invokedFunctionArguments).toMatchObject(userData);
   });
});
