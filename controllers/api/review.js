const router = require('express').Router();
const { Review } = require('../../models/');
// const withAuth = require('../../utils/auth');


router.post('/', async (req, res) => {
    try {
        const newReview = await Review.create({
            rating: req.body.rating, 
            take: req.body.take,
            movie_id: req.body.movie_id,
            user_id: req.body.user_id
        });
        console.log(newReview);
        res.status(200).json(newReview);
    } catch (error) {
        res.status(500).json(error);
    }
})



module.exports = router;
