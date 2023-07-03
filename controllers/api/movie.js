const router = require("express").Router();
const axios = require("axios");

// /api/movie
router.post("/", async (req, res) => {
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?t=${req.body.title}&apikey=${process.env.MOVIE_API}`
    );
    // console.log('-------------');
    // console.log(response);
    // console.log('-------------');

    //check against database with imdbID, if exists get all reviews

    const data = {
      poster: response.data.Poster,
      title: response.data.Title,
      plot: response.data.Plot,
      year: response.data.Year,
      imdbID: response.data.imdbID,
    };
    for (const rating of response.data.Ratings) {
      data[rating.Source.split(" ")[0]] = rating;
    }
    // res.status(200).json(response.data);
    res.render("moviepage", { ...data, loggedIn: req.session.loggedIn });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
