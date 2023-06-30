const router = require("express").Router();
const movieRouter = require('./movie');

//  will eventually store paths to user routes -- movie routes and all that jazz
router.use('/movie', movieRouter);

module.exports = router;
