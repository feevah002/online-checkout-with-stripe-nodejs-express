const Product = require("./model")

// to view all products
exports.products = async ()=>{
  let products = await Product.find({});
  return products;
}
// to add a new product
exports.newProduct = async (product)=>{
  let newProduct = await Product.create(product);
  return newProduct;
} 

exports.productById = async (id)=>{
  let productById = await Product.findById(id);
  return productById;
}

