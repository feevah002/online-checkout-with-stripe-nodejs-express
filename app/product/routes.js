const router = require("express").Router({mergeParams: true});
const productController = require("./controller");
const middlewareObj = require("../../middleware/index");


// user/customer product roytes
// router.get("/admin", productController.getProducts)
// router.get("/admin/meatro", productController.getProducts)

router.get("/", (req,res)=>{res.redirect("/products")})
router.get("/products", productController.getProducts)

// creating a new product - admin
router.get("/products/new",productController.newProdForm)
router.post("/products",  productController.create)




module.exports= router