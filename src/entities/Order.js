const { randomUUID } = require("crypto");

module.exports.Order = class Order {
  constructor({
    id,
    product_ids = [],
    user_id = null,
    invoice_id = null,

    price_in_usd = null,
    price = null,
    currency = null,
    is_fully_payed = null,

    create_date = null,
    update_date = null,
    meta = {},
  }) {
    this.id = id;
    this.product_ids = product_ids;
    this.invoice_id = invoice_id;
    this.user_id = user_id;

    this.price_in_usd = price_in_usd;
    this.price = price;
    this.currency = currency;
    this.is_fully_payed = is_fully_payed;

    this.create_date = create_date;
    this.update_date = update_date;
    this.meta = meta;
  }
};
