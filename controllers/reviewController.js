const  db = require('../models/indexStart');
const Review = db.reviews;

module.exports = {

    // 1. Add Review
    addReview: async (req, res, next) => {
        try {
            let { rating, description } = req.body;
            let reviewData = {
                rating,
                description
            };

            // Add the review to the database or wherever necessary
            let newReview = await Review.create(reviewData);
            res.status(200).json(newReview); // Return the created review as a response
        } catch (error) {
            next(error); // Pass error to error handling middleware
        }
    },

    // 2. Get All Reviews
    getAllReviews: async (req, res, next) => {
        try {
            let reviews = await Review.findAll();
            if (!reviews.length) {
                throw createError(404, 'No reviews found');
            }
            res.status(200).send(reviews);
        } catch (error) {
            next(error);
        }
    },

    // 3. Get a Single Review
    getReview: async (req, res, next) => {
        try {
            let { id } = req.params; // Get the review ID from request params
            let review = await Review.findOne({ where: { id } }); // Find review by ID

            if (!review) {
                throw createError(404, 'Review not found');
            }

            res.status(200).send(review); // Return the review
        } catch (error) {
            next(error); // Pass error to error handling middleware
        }
    },

    // 4. Update Review
    updateReview: async (req, res, next) => {
        try {
            let { id } = req.params;
            let updatedReview = await Review.update(req.body, {
                where: { id: id }
            });

            if (updatedReview[0] === 0) {
                throw createError(404, 'Review update failed');
            }

            res.status(200).send('Review updated successfully');
        } catch (error) {
            next(error);
        }
    },

    // 5. Delete Review
    deleteReview: async (req, res, next) => {
        try {
            let { id } = req.params;
            let deletedReview = await Review.destroy({
                where: { id: id }
            });

            if (deletedReview === 0) {
                throw createError(404, 'Review not found');
            }

            res.status(200).send('Review deleted successfully');
        } catch (error) {
            next(error);
        }
    }
};
