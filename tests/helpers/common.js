const userChance = require('./user.fake');
const productChance = require('./product.fake');
const orderChance = require('./order.fake');

const Chance = require("chance");
const chance = new Chance();

chance.mixin({
  user: () => userChance(chance),
  product: () => productChance(chance),
  order: () => orderChance(chance),
  emailKnowen: () =>
    chance.email({
      domain: chance.pickone([
        "live.com",
        "yahoo.com",
        "gmail.com",
        "hotmail.com",
      ]),
    }),
});

module.exports = chance;