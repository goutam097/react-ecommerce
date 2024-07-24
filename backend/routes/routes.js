const express = require("express");
const { createBlogs, blogList, blogDetails, blogDelete, blogUpdate } = require("../controller/blogs.controller");
const { register, login, allUsers,userDetailsController, updateUser } = require("../controller/user.controller");
const { createProductController, updateProductController, getProductController, getSingleProductController, productPhotoController, productDeleteController } = require("../controller/product.controller");
const { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController } = require("../controller/category.model");
const { addToCartController,addToCartViewProduct,countAddToCartProduct,deleteAddToCartProduct,updateAddToCartProduct} = require("../controller/cart.controller");
const upload = require("../middleware/uploadImage");


const router = express.Router();

//blog router
router.post("/create/blogs", createBlogs).get("/blogs/list", blogList).get("/blogs/details/:id", blogDetails);
router.put('/blogs/update/:id', blogUpdate).delete("/blogs/delete/:id", blogDelete);

// user router 
router.post("/user/register", register).post("/user/login", login)
router.get("/all-user",allUsers)
router.get("/user-details",userDetailsController)
router.post("/update-user",updateUser)



//product router


router.post('/create-product', upload.array("photo"), createProductController);

//update product
router.put('/update-product/:pid',  updateProductController);


//get products
router.get('/get-product', getProductController);

//single products
router.get('/single-product/:slug', getSingleProductController);

//get photo
router.get('/product-photo/:pid', productPhotoController);


//delete product
router.delete('/delete-product/:pid', productDeleteController);




// category routes 

//create category
router.post('/create-category', createCategoryController)

//update category
router.put('/update-category/:id', updateCategoryController)

//get all category
router.get('/get-category',  categoryController)

//single category
router.get('/single-category/:slug',  singleCategoryController)

//delete category
router.delete('/delete-category/:id', deleteCategoryController)

//user add to cart
router.post("/addtocart",addToCartController)
router.get("/view-card-product",addToCartViewProduct)
router.get("/countAddToCartProduct",countAddToCartProduct)
router.post("/delete-cart-product",deleteAddToCartProduct)
router.post("/update-cart-product",updateAddToCartProduct)


// router.post("/addtocart",authToken,addToCartController)
// router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
// router.get("/view-card-product",authToken,addToCartViewProduct)
// router.post("/update-cart-product",authToken,updateAddToCartProduct)
// router.post("/delete-cart-product",authToken,deleteAddToCartProduct)


module.exports = router;