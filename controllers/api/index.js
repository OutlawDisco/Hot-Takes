const router = require("express").Router();
const movieRouter = require('./movie');
const userRouter = require('./user-routes')

const reviewRouter = require('./review');


//  will eventually store paths to user routes -- movie routes and all that jazz
router.use('/movie', movieRouter);
router.use('/review', reviewRouter);
router.use('./user', userRouter)

module.exports = router;
