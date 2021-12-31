const { randomUUID } = require("crypto");
const Chance = require("chance");
const chance = new Chance();

// const { User, userConstants } = require("../../entities/User");
const { addUserUseCase } = require("../index");
const { userRepository } = require("../../frameworks/reposetories/inMemory/");
const createFaketUser = require("../../../tests/helpers/user.fake");
const createTestUser = () => createFaketUser(chance);

const mockUserRepo = {
  add: jest.fn(async (user) => ({
    ...user,
    id: randomUUID(),
  })),
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
    const call = mockUserRepo.add.mock.calls[0][0];
    expect(call.id).toBeUndefined();
    expect(call.name).toBe(newUser.name);
  });
});
