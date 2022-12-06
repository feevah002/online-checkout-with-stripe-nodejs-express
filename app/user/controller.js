const passport = require("passport");
const userRepo = require("./repository");

const User = require("./model")

exports.regForm = async(req,res)=>{
  res.render("register")
}
exports.loginForm = async(req,res)=>{
  res.render("login")
}
// reqgister new user 
exports.register = async (req, res, next)=>{
  try{
    const email = req.body.username.toLowerCase()
 
    const payload= {
      username: email,
    }
    const password = req.body.password;
    const user = new User(payload)
    const regUser = await User.register(user, password)
  
    passport.authenticate("local")(req,res, function(){
       res.redirect("/")
    })
    
  } catch(err){
    res.status(500).json({
      status: false,
      error:err
    })
  }
}


//logout
exports.logout = async (req,res,next)=>{
  req.logout(err=>{
    if(err){return next (err)
    } else {
      res.redirect("/")
    }
  });
};
exports.login = ("/login", passport.authenticate("local",{
  successRedirect:"/",
  failureRedirect:"/login"
}))

