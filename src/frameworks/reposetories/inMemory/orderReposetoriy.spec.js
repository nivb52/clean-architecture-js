const Chance = require("chance");
const chance = new Chance();
const { Order } = require("../../../entities/");
const orderRepository = require("./orderRepository");
const createFaketOrder = require("./../../../../tests/helpers/order.fake");
const createTestOrder = () => createFaketOrder(chance);

describe("Order repository", () => {
  test("New Order should be added and returned", async () => {
    const testOrder = createTestOrder();
    const addedOrder = await orderRepository.add(testOrder);

    expect(addedOrder).toBeDefined();
    expect(addedOrder.id).toBeDefined();
    expect(addedOrder.user_id).toBe(testOrder.user_id);
    expect(addedOrder.price).toBe(testOrder.price);
    expect(addedOrder.currency).toBe(testOrder.currency);
    expect(addedOrder.create_date).toEqual(testOrder.create_date);
    expect(addedOrder.is_fully_payed).toEqual(testOrder.is_fully_payed);
  });

  test("New Order should be findable in db", async () => {
    const testOrder = createTestOrder();
    const addedOrder = await orderRepository.add(testOrder);
    const foundOrder = await orderRepository.getById(addedOrder.id);
    expect(foundOrder).toEqual(testOrder);
  });

  test("Order should be deleted & empty object should be returned", async () => {
    // init 2 Order & delete one & test
    const [presistOrder, deleteOrder] = await Promise.all([
      orderRepository.add(createTestOrder()),
      orderRepository.add(createTestOrder()),
    ]);

    const deleteOrderResult = await orderRepository.delete(deleteOrder.id);
    expect(deleteOrderResult).toEqual({});

    const foundDeletedOrder = await orderRepository.getById(deleteOrder.id);
    expect(foundDeletedOrder).toBeNull();

    const foundPresistenceOrder = await orderRepository.getById(
      presistOrder.id
    );
    expect(foundPresistenceOrder).toEqual(presistOrder);
  });

  test("Order should be updated & user object should be returned", async () => {
    const updateOrder = await orderRepository.add(createTestOrder());
    const currency = chance.currency().code;
    const price = chance.natural();
    updateOrder.currency = currency;
    updateOrder.price = price;
    const updatedOrderResult = await orderRepository.update(updateOrder);

    expect(updatedOrderResult).toEqual(updateOrder);
    expect(updatedOrderResult.currency).toEqual(currency);
    expect(updatedOrderResult.price).toEqual(price);
  });
});
