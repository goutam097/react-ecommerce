const mongoose = require('mongoose')

const addToCartSchema = new mongoose.Schema({
   productId : {
        ref : 'Products',
        type : String,
   },
   quantity : Number,
   userId : String,
},{
    timestamps : true
})


module.exports = mongoose.model("addToCart", addToCartSchema);