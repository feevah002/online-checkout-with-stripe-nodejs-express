const Order = require("./model")

exports.newOrder = async(data, customer)=>{
  const createdOrder = await Order.create({
    userId:customer.metadata.customerId,
    stripeId: customer.id,
    email: customer.email,
    name: data.customer_details.name,
    phone:data.customer_details.phone,
    bought:JSON.parse(customer.metadata.cart),
    shippingCost:data.shipping_cost,
    shippingDetails:data.shipping_details.address,
    subTotal: data.amount_subtotal,
    total_paid:data.amount_total,
  })
  return createdOrder
}
