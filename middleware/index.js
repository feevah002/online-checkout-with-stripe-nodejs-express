middlewareObj={};
middlewareObj.isUserLoggedIn = function (req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login")
  }


module.exports = middlewareObj;