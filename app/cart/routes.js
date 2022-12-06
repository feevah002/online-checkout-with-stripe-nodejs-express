const router = require("express").Router();
const middlewareobj = require("../../middleware/index")
const cartController = require("./controller");


// router.get("/meatro/:uid/cart", middlewareObj.isUserLoggedIn, cartController.getCart)
router.get("/meatro/:uid/cart", middlewareObj.isUserLoggedIn, cartController.getCart)

router.post("/cart/:pid/add-to-cart", middlewareObj.isUserLoggedIn, cartController.addItemToCart)

router.post("/cart/:pid", middlewareObj.isUserLoggedIn, cartController.emptyCart)

module.exports = router