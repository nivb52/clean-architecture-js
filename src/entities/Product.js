module.exports.Product = class Product {
  constructor({
    id,
    name = null,
    inner_name = null,
    price = null,
    category_id = null,
    manufacturer_id = null,
    
    model = null,
    color = null,
    desc = null,
    images = [],
    main_image = null,
    meta = {
      category : null,
      manufacturer: null,      
    },
  }) {
    this.id = id;
    this.name = name;
    this.inner_name = inner_name;
    this.price = price;
    this.category_id = category_id;
    this.manufacturer_id = manufacturer_id;
    
    this.model = model;
    this.color = color;
    this.desc = desc;
    this.images = images;
    this.main_image = main_image;
    this.meta = meta;
  }
};
