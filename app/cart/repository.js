const Cart = require("./model");
let populateQuery = [{
  path:"items.userId",
  select: "username "

},{
  path:"items.productId",
  select: "name price"
},
,{
  path:"userId",
  select: "username"
}]
exports.cart = async ()=>{
  let cart = await Cart.find({}).populate(populateQuery)
  return cart;
}

exports.addItem = async (item)=>{
   let newItem = await Cart.create(item);
   return newItem
}
exports.deleteCart = async(id)=>{
  let delCart = await Cart.findByIdAndDelete(item);
  return delCart
}
