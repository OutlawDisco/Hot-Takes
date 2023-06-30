const router = require("express").Router();
const movieRouter = require('./movie');

const reviewRouter = require('./review');


//  will eventually store paths to user routes -- movie routes and all that jazz
router.use('/movie', movieRouter);
router.use('/review', reviewRouter);

module.exports = router;
