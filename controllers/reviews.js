const Campground = require('../models/campground');
const Review = require('../models/reviews');

module.exports.postReview = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.review.push(review)
    await review.save()
    await campground.save()
    req.flash('sucess', 'Sucessfully created new review')
    res.redirect(`/campgrounds/${id}`)
}
module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId)
    req.flash('sucess', 'Sucessfully deleted review')
    res.redirect(`/campgrounds/${id}`)

}