const express = require('express');
const reviewController = require('../controllers/reviewController'); // Ensure the correct path

const routes = express.Router();

// Route definitions for review actions
routes.post('/addReview', reviewController.addReview);
routes.get('/getAllReviews', reviewController.getAllReviews);
routes.get('/getReview/:id', reviewController.getReview);
routes.put('/updateReview/:id', reviewController.updateReview);
routes.delete('/deleteReview/:id', reviewController.deleteReview);

module.exports = routes;



