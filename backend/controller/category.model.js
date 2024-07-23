const categoryModel = require("../model/category.model.js")
const slugify = require("slugify")

 const createCategoryController = async(req, res) =>{
try {
    const {name} = req.body;
    if(!name){
        return res.status(401).send({message:'Name is required'})
    }
    const existingCategory = await categoryModel.findOne({name})
    if(existingCategory){
        return res.status(200).send({message:'Category Already Exists'})

    }
    const category = await new categoryModel({name, slug:slugify(name)}).save();
    return res.status(201).send({
        success: true,
        message:'Category Already Exists',
        category
    })

    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:"Error in category"
    })
}
}

// update category

 const updateCategoryController = async(req, res) =>{
    try {
        const {name} = req.body
        const {id} = req.params

        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},
        {new:true});
        return res.status(201).send({
            success: true,
            message:'Category updated successfully',
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while updating category"
        })
    }
}

// get all category

 const categoryController = async(req, res) =>{
    try {
        const category = await categoryModel.find({});
        return res.status(200).send({
            success: true,
            message:'All Categories List',
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting all categories"
        })
    }
}

// single category

 const singleCategoryController = async(req, res) =>{
    try {
        // const {slug} = req.params;
        const category = await categoryModel.findOne({slug:req.params.slug});
        return res.status(200).send({
            success: true,
            message:'Get single category successfully',
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting single categories"
        })
    }
}

// delete category

 const deleteCategoryController = async(req, res) =>{
    try {
        const {id} = req.params;
        // console.log(id,'------------')
        await categoryModel.findByIdAndDelete(id);
        return res.status(200).send({
            success: true,
            message:'category deleted successfully',
            
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while deleting categories"
        })
    }
}

module.exports = { 
    createCategoryController,
    updateCategoryController,
    categoryController,
    singleCategoryController,
    deleteCategoryController,
    };