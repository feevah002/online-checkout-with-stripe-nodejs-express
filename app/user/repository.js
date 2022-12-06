const User = require("./model")

exports.register = async (payload, password)=>{
  const user =   new User(payload)
  const regUser = await User.register(user, password)
  return regUser;
}

