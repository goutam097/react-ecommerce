

const slugify = require("slugify")
const productModel = require("../model/product.model")
const path = require("path")
const baseUrl = process.env.BASE_URL || 'http://localhost:9901';

const createProductController = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send({
                success: false,
                message: 'No photos provided'
            });
        }

        // const photoArray = req.files.map(file => file.path);
        // console.log(photoArray)
        const photoArray = req.files.map(file => path.join('uploads', 'product', path.basename(file.filename)));
        console.log(photoArray);

        const { name, description, price, category, quantity, shipping } = req.body;
        if (!name || !description || !price || !category || !quantity) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required'
            });
        }

        const product = new productModel({
            name,
            description,
            price,
            category,
            quantity,
            shipping,
            slug: slugify(name),
            photo: photoArray,
        });

        const product_data = await product.save();

        return res.status(201).send({
            success: true,
            message: 'Product created successfully',
            product: product_data,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Server Error',
        });
    }
};

/* const createProductController = async (req, res) => {
    try {
      const { name, description, price, category, quantity, shipping } = req.body;
    //   const {photo} = req.file
      console.log(req.file,'----------------------')
  
      // Validate input
      const validationError = validateProductInput({ name, description, price, category, quantity, photo: req.file });
      if (validationError) return res.status(400).send({ error: validationError });
  
      // Process the uploaded file if necessary
      const imageName = req.file ? req.file.filename : null;
  
      // Create product
      const newProduct = new productModel({
        photo: imageName,
        name,
        description,
        price,
        category,
        quantity,
        shipping,
        slug: slugify(name),
      });
  
      // Save product
      await newProduct.save();
  
      // Response
      return res.status(201).send({
        success: true,
        message: 'Product created successfully',
        product: newProduct,
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        error: error.message,
        message: "Error in creating product",
      });
    }
  };
  
  // Validate product input
  const validateProductInput = ({ name, description, price, category, quantity, photo }) => {
    if (!name) return 'Name is required';
    if (!description) return 'Description is required';
    if (!price) return 'Price is required';
    if (!category) return 'Category is required';
    if (!quantity) return 'Quantity is required';
    if (photo && photo.size > PHOTO_SIZE_LIMIT) return 'Photo should be less than 1MB';
    return null;
  }; */

// get product 
const getProductController = async (req, res) => {
    try {
        
        let products = await productModel.find({}).populate('category').select("-product").limit(12).sort({ createdAt: -1 })
        products = products.map(product => {
            const normalizedPhotoPaths = product.photo.map(path => path.replace(/\\/g, '/'));
            product.photo = normalizedPhotoPaths.map(path => `${baseUrl}/${path}`);
            return product;
        });


        return res.status(201).send({
            success: true,
            totalCount: products.length,
            message: 'All products',
            products,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting products",
            error: error.message
        })
    }
}


// get single product 
const getSingleProductController = async (req, res) => {
    try {
        // let product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category")
        let product = await productModel.findOne({ slug: req.params.slug }).populate("category")
        if (product && product.photo) {
            product.photo = product.photo.map(path => `${baseUrl}/${path.replace(/\\/g, '/')}`);
        }
        // product = product.map(product => {
        //     const normalizedPhotoPaths = product.photo.map(path => path.replace(/\\/g, '/'));
        //     product.photo = normalizedPhotoPaths.map(path => `${baseUrl}/${path}`);
        //     return product;
        // });
        return res.status(200).send({
            success: true,
            message: 'single products fetched',
            product,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting single products",
            error: error.message
        })
    }
}

// get  product photo
const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if (product.photo.data) {
            res.set('content-type', product.photo.contentType)
            return res.status(200).send(
                product.photo.data,
            )
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error: error.message
        })
    }
}


// const productPhotoController = async (req, res) => {
//     try {
//         const product = await productModel.findById(req.params.pid).select("photo");

//         if (product && product.photo && product.photo.data) {
//             const normalizedPhotoPath = `${baseUrl}/${product.photo.data.replace(/\\/g, '/')}`;
//             res.set('Content-Type', product.photo.contentType);
//             return res.status(200).send(normalizedPhotoPath);
//         } else {
//             return res.status(404).send({
//                 success: false,
//                 message: "Photo not found",
//             });
//         }

//     } catch (error) {
//         console.error(error);
//         return res.status(500).send({
//             success: false,
//             message: "Error while getting photo",
//             error: error.message
//         });
//     }
// }

// delete product


const productDeleteController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")

        return res.status(200).send({
            success: true,
            message: 'product deleted successfully'
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error
        })
    }
}

// update product 
const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        //validation
        switch (true) {
            case !name: return res.status(500).send({ error: 'Name is required' })
            case !description: return res.status(500).send({ error: 'Description is required' })
            case !price: return res.status(500).send({ error: 'Price is required' })
            case !category: return res.status(500).send({ error: 'Category is required' })
            case !quantity: return res.status(500).send({ error: 'Quantity is required' })
            // case !shipping: return res.status(500).send({error:'Shipping is required'})
            case photo && photo.size > 1000000: return res.status(500).send({ error: 'Photo is required and should be less than 1mb' })

        }
        const products = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();
        return res.status(201).send({
            success: true,
            message: 'Product upadted successfully',
            products
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating product"
        })
    }
}


module.exports = {
    createProductController,
    getProductController,
    getSingleProductController,
    productPhotoController,
    productDeleteController,
    updateProductController,
};