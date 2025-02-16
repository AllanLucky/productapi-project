const express = require('express');

// ImportControllers Review, Product
const productController = require('../controllers/productController'); // Ensure the path is correct
const routes = express.Router();

// Route definitions
routes.post('/addProduct', productController.addProduct);
routes.get('/getAllproducts', productController.getProducts);
// New route to get product reviews
routes.get('/getProductReviews/:id', productController.getProductReviews);
routes.get('/getProduct/:id', productController.getOneProduct);
routes.get('/getPublishedProduct/:id', productController.getPublishedProduct);
routes.put('/updateProduct/:id', productController.updateProduct);
routes.delete('/deleteProduct/:id', productController.deleteProduct);




module.exports = routes;


