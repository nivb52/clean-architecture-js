const { randomUUID } = require("crypto");
const Chance = require("chance");
const chance = new Chance();

const {
  product: {
    addProductUseCase,
    getProductByIdUseCase,
    updateProductUseCase,
    deleteProductUseCase,
  },
} = require("../index");
const fakeProductFactory = require("../../../tests/helpers/product.fake");
const createTestProduct = () => fakeProductFactory(chance);

const mockProductRepo = {
  add: jest.fn(async (product) => ({
    ...product,
    id: randomUUID(),
  })),
  getById: jest.fn(async (id) => {
    const product = createTestProduct();
    product.id = id;
    return product;
  }),
  update: jest.fn(async (product) =>
    product.id ? Object.assign({}, product) : new Error("id is missing")
  ),
  delete: jest.fn(async (product) => (product.id ? {} : new Error("id is missing"))),
};

const dependencies = {
  productRepository: mockProductRepo,
};

describe("Product use cases", () => {
  test("Add product use case", async () => {
    // create a user data
    const newUser = createTestProduct();
    // add a user using the use case
    const addedUser = await addProductUseCase(dependencies).execute(newUser);

    expect(addedUser.id).toBeDefined();
    expect(addedUser.name).toBe(newUser.name);

    // check that the dependencies called as expected
    const invokedFunctionArguments = mockProductRepo.add.mock.calls[0][0];
    expect(invokedFunctionArguments.id).toBeUndefined();
    expect(invokedFunctionArguments.name).toBe(newUser.name);
  });
  test("get product by id use case", async () => {
    const id = randomUUID();
    const foundProduct = await getProductByIdUseCase(dependencies).execute({ id });

    expect(foundProduct.id).toBe(id);

    // check that the dependencies called as expected
    const expectedId = mockProductRepo.getById.mock.calls[0][0];
    expect(expectedId).toBe(id);
  });

    test("Update product (by id) use case", async () => {
      // create a user data
      const productData = createTestProduct();
      productData.id = randomUUID();
      // call update a user
      const updatededProduct = await updateProductUseCase(dependencies).execute(
        productData
      );

      // check the result
      expect(updatededProduct).toEqual(productData);

      // check that the dependencies called as expected
      const invokedFunctionArguments = mockProductRepo.update.mock.calls[0][0];
      expect(invokedFunctionArguments).toStrictEqual(productData);
    });
  
   test("Delete product (by id) use case", async () => {
     // create a user data
     const productData = createTestProduct();
     productData.id = randomUUID();
     // call delete a user
     const deletedProduct = await deleteProductUseCase(dependencies).execute(
       productData
     );

     // check the result
     expect(deletedProduct).toStrictEqual({});

     // check that the dependencies called as expected
     const invokedFunctionArguments = mockProductRepo.delete.mock.calls[0][0];
     expect(invokedFunctionArguments).toMatchObject(productData);
   });
});
