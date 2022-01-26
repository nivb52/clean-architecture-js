const { Order } = require("../../src/entities/");
// const { randomUUID } = require("crypto");

module.exports = (chance) =>
  new Order({
    product_ids: [chance.n(chance.guid, Math.floor(Math.random() * 4 + 1))],
    user_id: chance.guid(),
    invoice_id: chance.guid(),

    price_in_usd: chance.natural({ min: 5, max: 2000 }),
    price: chance.natural({ min: 5, max: 2000 }),
    currency: "USD",

    create_date: new Date(),
    update_date: new Date(),
    is_fully_payed: chance.bool(),
  });
  