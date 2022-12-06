const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
  },
  phone:{
    type:Number,
    required:true,
  },
  delivered:{
    type:Boolean,
    default:false
  },
  stripeId:{
    type:String,
    required:true
  },
  shippingCost:{
    type:Object,
    required:true
  },
  shippingDetails:{
    type:Object,
    required:true
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  },
  bought:{
    type:Array,
    required:true
  },
  subTotal:{
    type:Number,
    required:true,
  },
  total_paid:{
    type:Number,
    required:true,
  },
 
},{
  timestamps:true
})
const Order = mongoose.model("Order", orderSchema)
module.exports = Order;