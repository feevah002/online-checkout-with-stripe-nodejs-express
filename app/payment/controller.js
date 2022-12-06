const paymentRepo = require("./repository")
const cartRepo = require("../cart/repository")
const orderRepo = require("../order/repository");


//create checkout
exports.createCheckOut = async (req,res,next)=>{
  try{
    const allCarts = await cartRepo.cart();
    const cart = allCarts.find(cart => cart.userId.id == req.user.id)
    const cartitems = await cart.items.map(item =>{
      return{
        price_data:{
          currency:"usd",
          product_data:{
            name: item.productId.name,
            images:[item.productId.image],
            description:[item.productId.description],
          },
          unit_amount: item.productId.price * 100
        },
        quantity: item.quantity
      }
    })
    const session = await paymentRepo.createCheckOutSession(
      req.user.id,
      cartitems,

    )
    res.redirect( session.url)
  } catch(err){
    res.status(500).json({
      status:false,
      err:err
    })
  }
}

//webhook
exports.webhook = async (req,res,next)=>{
  let event
  try{
    event = await paymentRepo.createWebhook(
      req.body,
      req.header("stripe-signature"),
    )
  }catch(err){
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
    // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
          const data = event.data.object;
          await paymentRepo.findCustomer(data.customer)
          .then(async (customer)=>{
            const newOrder = await orderRepo.newOrder(data, customer)
            const allCarts = await cartRepo.cart();
            const cart = allCarts.find(cart => cart.userId.id ==customer.metadata.customerId)
            cart.items.splice(0, cart.items.length);
            cart.subTotal = 0;
            await cart.save()
          }).catch((e)=>{
            console.log(e)
            res.status(500).json({
              status:false,
              err:e
            })
          })      
          break;  
    default:
          
  }
  res.status(200).end()
}
exports.success = async (req,res)=>{
  res.render("success")
}
exports.cancel = async (req,res)=>{
  res.render("cancel")
}