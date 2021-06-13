const express = require('express')
const router = express.Router()
const { campSchema } = require('../schema');
const catchError = require('../utils/catchError');
const ExpressError = require('../utils/ExpressError');
const { isLoggedin, isAuthor, validateCampground } = require('../logedinMiddleware')
const campgrounds = require('../controllers/campgrounds')
const multer = require('multer');
const { storage } = require('../cloudinary')
const upload = multer({ storage })
const Campground = require('../models/campground');
router.route('/')
    .get(catchError(campgrounds.AllCamps))
    .post(isLoggedin, upload.array('image'), validateCampground, catchError(campgrounds.postNewCampground))

router.get('/new', isLoggedin, campgrounds.renderNewCampgroundForm)

router.route('/:id')
    .get(catchError(campgrounds.showCampground))
    .put(isLoggedin, isAuthor, upload.array('image'), validateCampground, catchError(campgrounds.editCampground))
    .delete(isLoggedin, catchError(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedin, isAuthor, catchError(campgrounds.editCampgroundForm))

module.exports = router;