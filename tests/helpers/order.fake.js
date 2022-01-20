const { Order } = require("../../src/entities/");
const { randomUUID } = require("crypto");

module.exports = (chance) =>
  new Order({
    product_ids: [chance.n(randomUUID, Math.floor(Math.random() * 4 + 1))],
    user_id: randomUUID(),
    invoice_id: randomUUID(),

    price_in_usd: chance.natural(),
    price: chance.natural(),
    currency: "USD",

    create_date: new Date(),
    update_date: new Date(),
    is_fully_payed: chance.bool(),
  });
