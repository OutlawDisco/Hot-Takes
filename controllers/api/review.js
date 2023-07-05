const router = require('express').Router();
const { Review, Movie, User } = require('../../models/');
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



module.exports = router;
