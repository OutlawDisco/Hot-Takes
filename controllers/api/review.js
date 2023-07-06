const router = require('express').Router();
const { Review, Movie, User, ReviewVote } = require('../../models/');
// const ReviewVote = require('../../models/ReviewVote');
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
        const currentUser = await User.findOne({
            where: {
                id: req.session.userId,
            }
        })

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
        // const newVote = await ReviewVote.create({
        //     upVote: req.body.vote
        // })
        // await currentUser.add
        await ReviewVote.create({
            user_id: req.session.userId,
            review_id: req.body.reviewId,
            upVote: req.body.vote
        })
// console.log(currentReview);
        res.redirect(`/api/movie?imdbID=${currentReview.Movie.imdbID}`);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

// router.get('/vote', withAuth, async (req, res) => {
//     try {
//         const reviewVotes = await ReviewVote.findAll({
//             where: {
//                 review_id: req.body.reviewId,
//             },
//             attributes: {
//                 include: [
//                     [sequelize.fn('COUNT', sequelize.col('up_vote')), 'heat_up']
//                 ]
//             }
//         })
//         console.log('---------------------------');
//         console.log(reviewVotes);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error)
//     }
// })




module.exports = router;
