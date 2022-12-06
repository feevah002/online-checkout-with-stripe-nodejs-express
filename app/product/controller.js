const productRepository = require("./repository")

// getting all products - user
exports.getProducts = async (req, res)=>{
  try{
   let allProducts = await productRepository.products() 
   res.render("index",{products: allProducts})
  } catch(err) {
      res.status(500).json({
        error:err,
        status:false,
      });
  }
}

//new form for product 
exports.newProdForm = (req,res)=>{
  res.render("newproduct")
}
// adding a nerw product
exports.create = async (req,res)=>{
  try{
    console.log(req.body.product)
    let newProd = req.body.product;
    let addedProduct = await productRepository.newProduct(newProd)
    res.redirect("/products")
    }
    catch(err){
  
      res.status(500).json({
        error:err,
        status:false,
      })
    }
}
// viewing a particular product - user
exports.findById = async (req, res)=>{
  try{
    let pid = req.params.pid;
    let foundProduct = await productRepository.productById(pid);
    return foundProduct;
  } catch(err) {
    res.status(500).json({
      error:err,
      status:true,
    });
  }
  
}