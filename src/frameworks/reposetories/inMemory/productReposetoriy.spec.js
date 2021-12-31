const Chance = require("chance");
const chance = new Chance();
const { Product } = require("../../../entities/");
const productRepository = require("./producRepository");
const createFaketProduct = require("./../../../../tests/helpers/product.fake");
const createTestProduct = () => createFaketProduct(chance);

describe("Product repository", () => {
  test("New Product should be added and returned", async () => {
    const testProduct = createTestProduct();
    const addedProduct = await productRepository.add(testProduct);

    expect(addedProduct).toBeDefined();
    expect(addedProduct.id).toBeDefined();
    expect(addedProduct.name).toBe(testProduct.name);
    expect(addedProduct.color).toBe(testProduct.color);
    expect(addedProduct.manufacturer).toBe(testProduct.manufacturer);
    expect(addedProduct.meta).toEqual(testProduct.meta);
  });

  test("New Product should be findable in db", async () => {
    const testProduct = createTestProduct();
    const addedProduct = await productRepository.add(testProduct);
    const foundProduct = await productRepository.getById(addedProduct.id);
    expect(foundProduct).toEqual(testProduct);
  });

  test("Product should be deleted & empty object should be returned", async () => {
    // init 2 Products & delete one  user & test
    const [presistProduct, deleteProduct] = await Promise.all([
      productRepository.add(createTestProduct()),
      productRepository.add(createTestProduct()),
    ]);

    const deleteUserResult = await productRepository.delete(deleteProduct.id);
    expect(deleteUserResult).toEqual({});

    const foundDeletedProduct = await productRepository.getById(
      deleteProduct.id
    );
    expect(foundDeletedProduct).toBeNull();

    const foundPresistenceProduct = await productRepository.getById(
      presistProduct.id
    );
    expect(foundPresistenceProduct).toEqual(presistProduct);
  });

  test("Product should be updated & user object should be returned", async () => {
    const updateProduct = await productRepository.add(createTestProduct());
    const name = chance.name();
    const color = chance.color();
    updateProduct.name = name;
    updateProduct.color = color;
    const updatedProductResult = await productRepository.update(updateProduct);

    expect(updatedProductResult).toEqual(updateProduct);
    expect(updatedProductResult.name).toEqual(name);
    expect(updatedProductResult.color).toEqual(color);
  });
});
