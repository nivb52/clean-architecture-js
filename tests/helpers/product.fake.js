const { Product } = require("../../src/entities/");

const chanceModel = (chance) =>
  chance.bool()
    ? chance.cf() // 'BRSMRT87S49A988X'
    : chance.bool()
    ? chance.n(chance.radio, chance.integer({ min: 1, max: 3 })).join("") +
      chance.integer({ min: 20, max: 200 }) // 'KCXW20' | 'KCXWXWKCZERA200'
    : chance.cpf().replace("-", "."); // 607.116.899.62'

module.exports = (chance) =>
  new Product({
    name: chance.name(),
    inner_name: null,
    price: chance.natural(),
    category_id: chance.guid(),
    manufacturer_id: chance.company(),
    model: chanceModel(chance),
    color: chance.color(),
    desc: chance.sentence(),
    images: [chance.n(chance.url, Math.floor(Math.random() * 5 + 1))],
    main_image: chance.url(),
    meta: {
      manufacturer: chance.company(),
      category: chance.guid(),
    },
  });
