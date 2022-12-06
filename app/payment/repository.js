const stripe = require("stripe")

const Stripe = stripe(process.env.STRIPE_SECRET_KEY)


exports.createCheckOutSession = async (customerId, product)=>{
  const customer = await Stripe.customers.create({
    metadata:{
      customerId:customerId,
      cart:JSON.stringify(product)
    }
  })
    const session = await Stripe.checkout.sessions.create({
    mode:"payment",
    payment_method_types: ['card'],
    customer:customer.id,
    shipping_address_collection: {allowed_countries: ['US', 'CA','NG']},
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {amount: 0, currency: 'usd'},
          display_name: 'Shipping',
          delivery_estimate: {
            minimum: {unit: 'business_day', value: 5},
            maximum: {unit: 'business_day', value: 7},
          },
        },
      },
    ],
      phone_number_collection:{
        enabled:true
      },
      line_items: product,
      success_url:`${process.env.SERVER_URL}/success`,
      cancel_url:`${process.env.SERVER_URL}/cancel`,
  })
  return session
}
exports.addNewUser = async (customerDetails)=>{
  const customer = await Stripe.customers.create({
    customerDetails,
    description:"new customer",
})
}

exports.createWebhook = async (rawBody, sig)=>{
 const event = await Stripe.webhooks.constructEvent(
  rawBody,
  sig,
  process.env.WEBHOOK_SECRET
  ) 
  return event
}


exports.findCustomer = async (data)=>{
  const customer = await Stripe.customers.retrieve(data)
  return customer
}