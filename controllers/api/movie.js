const router = require("express").Router();
const axios = require('axios')

// /api/movie
router.post('/', async (req, res) => {
    try {
        const response = await axios.get(`http://www.omdbapi.com/?t=${req.body.title}&apikey=${process.env.MOVIE_API}`)
        // console.log('-------------');
        // console.log(response);
        // console.log('-------------');

        res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})


module.exports = router;
