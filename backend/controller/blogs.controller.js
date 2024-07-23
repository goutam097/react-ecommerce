const BlogModel = require("../model/blogs.model");

// create blog
const createBlogs = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body
        //validation
        switch (true) {
            case !name: return res.status(500).send({ error: 'name is required' })
            case !email: return res.status(500).send({ error: 'email is required' })
        }

        const blog = new BlogModel({name, email, phone , address})
        await blog.save();
        return res.status(201).send({
            success: true,
            message: 'Blog created successfully',
            blog
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating Blog"
        })
    }
}

// update blog 
const blogUpdate = async (req, res) => {
    try {
        const {name, email, phone, address } = req.body

        //validation
        switch (true) {
            case !name: return res.status(500).send({ error: 'name is required' })
            case !email: return res.status(500).send({ error: 'email is required' })
            case !phone: return res.status(500).send({ error: 'phone is required' })
            case !address: return res.status(500).send({ error: 'address is required' })

        }
        const blog = await BlogModel.findByIdAndUpdate(req.params.id,req.body)
        // const blog = await BlogModel.findByIdAndUpdate(req.params.id,{image:imageName,name, email})

        return res.status(201).send({
            success: true,
            message: 'Blog updated successfully',
            blog
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating blog"
        })
    }
}

//get all blog
const blogList = async (req, res) => {
    try {
        const blogs = await BlogModel.find().limit(12).sort({ createdAt: -1 })
        return res.status(201).send({
            success: true,
            totalCount: blogs.length,
            message: 'All blogs',
            blogs,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting blogs",
            error: error.message
        })
    }
}

//get single blog
const blogDetails = async (req, res) => {
    try {
        const blog = await BlogModel.findOne({ _id: req.params.id })
        return res.status(200).send({
            success: true,
            message: 'single blog fetched',
            blog,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting single blog",
            error: error.message
        })
    }
}

//delete blog
const blogDelete = async (req, res) => {
    try {
        await BlogModel.findByIdAndDelete(req.params.id )
     
        return res.status(200).send({
            success: true,
            message: 'blog deleted successfully'
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while deleting blog",
            error
        })
    }
}


module.exports = { 
    createBlogs,
    blogUpdate,
    blogList,
    blogDetails,
    blogDelete,
    };
