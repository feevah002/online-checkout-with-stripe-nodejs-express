const router = require('express').Router({mergeParams:true})
const userController = require("./controller")

router.get("/register", userController.regForm)
router.post("/auth/register", userController.register)


router.get("/login", userController.loginForm)
router.post("/auth/login", userController.login)


router.post("/auth/logout",userController.logout)


module.exports = router