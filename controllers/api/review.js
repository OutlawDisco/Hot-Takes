const router = require('express').Router();
const { Review, Movie, User } = require('../../models/');
const ReviewVote = require('../../models/ReviewVote');
const withAuth = require('../../utils/auth');

//  /api/review
router.post('/', withAuth, async (req, res) => {
    try {
        // const id = 2
        const currentUser = await User.findOne({
            where: {
                id: req.session.userId,
            }
        })
        // console.log(req.session);
        let currentMovie = await Movie.findOne({
            where: {
                imdbID: req.body.imdbID,
                
            }
        })
        if (!currentMovie) {
            currentMovie = await Movie.create({
                imdbID: req.body.imdbID,
            })
            
        }

        // console.log(req.body);
        // console.log(currentMovie);
        const newReview = await Review.create({
            rating: req.body.rating, 
            take: req.body.take,
        });
        await currentUser.addReview(newReview)
        await currentMovie.addReview(newReview)
        // console.log(newReview);
        res.redirect(`/api/movie?imdbID=${currentMovie.imdbID}`);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})


router.post('/vote', withAuth, async (req, res) => {
    try {
        const currentReview = await Review.findOne({
            where: {
                id: req.body.reviewId,
            },
            include: [
                {
                    model: Movie,
                    attributes: [
                        "imdbID"
                    ]
                }
            ]
        })
        await ReviewVote.create({
            user_id: req.session.userId,
            review_id: req.body.reviewId,
            upVote: req.body.vote
        })
console.log(currentReview);
        res.redirect(`/api/movie?imdbID=${currentReview.Movie.imdbID}`);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})




module.exports = router;
