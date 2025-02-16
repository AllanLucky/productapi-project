const db = require('../models/indexStart');

// Create main Models
const Product = db.products; // Correct model name
const Review = db.reviews;   // Correct model name

// 1. Create Product
module.exports = {
    addProduct: async (req, res, next) => {
        try {
            let info = {
                title: req.body.title, // Corrected from 'tittle' to 'title'
                price: req.body.price,
                description: req.body.description,
                published: req.body.published ? req.body.published : false
            };
            let addProduct = await Product.create(info);
            res.status(200).send(addProduct);
        } catch (error) {
            next(error);
        }
    },

    // 2. Get All Products
    getProducts: async (req, res, next) => {
        try {
            let allProducts = await Product.findAll({});
            res.status(200).send(allProducts);
        } catch (error) {
            next(error);
        }
    },

    // Get A Single Product
    getOneProduct: async (req, res, next) => {
        try {
            let id = req.params.id;
            let product = await Product.findOne({ where: { product_id: id } });

            if (!product) {
                throw createError(404, 'Product does not exist');
            }

            res.status(200).send(product);
        } catch (error) {
            next(error);
        }
    },

    // Update product
    updateProduct: async (req, res, next) => {
        try {
            let id = req.params.id;
            let product = await Product.update(req.body, { where: { product_id: id } });

            if (product[0] === 0) { // If no rows were updated
                throw createError(404, 'Product update failed');
            }

            res.status(200).send('Product updated successfully');
        } catch (error) {
            next(error);
        }
    },

    // Get Published Products
    getPublishedProduct: async (req, res, next) => {
        try {
            let id = req.params.id;
            let product = await Product.findOne({ where: { product_id: id, published: true } });

            if (!product) {
                throw createError(404, 'Product not found or not published');
            }

            res.status(200).send(product);
        } catch (error) {
            next(error);
        }
    },

    // Delete the product
    deleteProduct: async (req, res, next) => {
        try {
            let id = req.params.id;
            let product = await Product.destroy({ where: { product_id: id } });

            if (product === 0) {
                throw createError(404, 'Product not found');
            }

            res.status(200).send('Product deleted successfully');
        } catch (error) {
            next(error);
        }
    },

    // GetProductReviews
    getProductReviews: async (req, res, next) => {
        try {
            let  id  = req.params;
      
            let product = await Product.findOne({
                include: [
                    {
                        model: db.reviews, // Use the correct model here
                        as: 'reviews', // Use the correct alias from the model association
                    },
                ],
                where: { product_id: id },
            });
      
            if (!product) {
                // If the product is not found, throw a 404 error
                throw createError(404, 'Product not found');
            }
      
            res.status(200).send(product);
        } catch (error) {
            // If there is an error, pass it to the next middleware (error handler)
            next(createError(500, 'Server Error'));
        }
    }
};
