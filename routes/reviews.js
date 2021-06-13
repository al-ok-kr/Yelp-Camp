const express = require('express')
const router = express.Router({ mergeParams: true })
const { reviewSchema } = require('../schema');
const catchError = require('../utils/catchError');
const ExpressError = require('../utils/ExpressError');
const { isLoggedin, validateReview, isReviewAuthor } = require('../logedinMiddleware')
const reviews = require('../controllers/reviews')

router.post('/', isLoggedin, validateReview, catchError(reviews.postReview))

router.delete('/:reviewId', isLoggedin, isReviewAuthor, catchError(reviews.deleteReview))

module.exports = router