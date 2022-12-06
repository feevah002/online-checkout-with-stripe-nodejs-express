require('dotenv').config()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const express = require("express")
const expressSession = require("express-session")
const passport = require("passport")
const User = require("./app/user/model")
const localStrategy = require("passport-local")
const app = express()


// connecting the database
main().catch(err=> console.log(err))
async function main(){
  await mongoose.connect(process.env.DB)
}



app.use('/webhook', bodyParser.raw({ type: 'application/json' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.set("view engine", "ejs")


// auth handling
app.use(expressSession({
  secret:"feevah the greatest",
  resave:false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
})

const paymentRoutes = require("./app/payment/routes");
const productRoutes = require("./app/product/routes")
const cartRoutes = require("./app/cart/routes");
const userRoutes = require("./app/user/routes");

app.use(productRoutes)
app.use(paymentRoutes)
app.use(cartRoutes)
app.use(userRoutes)



app.listen(3000, (err)=>{
  if(err){console.log(err)}
  console.log("server started successfully")
})

