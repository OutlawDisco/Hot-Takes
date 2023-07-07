const router = require("express").Router();
const axios = require("axios");
const { Movie, Review, User } = require("../../models/");
// const ReviewVote = require('../../models/ReviewVote');
const { fn, col } = require("sequelize");

// /api/movie
router.get("/", async (req, res) => {
  try {
    let response;
    if (req.query.title) {
      response = await axios.get(
        `http://www.omdbapi.com/?t=${req.query.title}&apikey=${process.env.MOVIE_API}`
      );
    } else if (req.query.imdbID) {
      response = await axios.get(
        `http://www.omdbapi.com/?i=${req.query.imdbID}&apikey=${process.env.MOVIE_API}`
      );
    }

    //check against database with imdbID, if exists get all reviews
    let movieExists = await Movie.findOne({
      where: {
        imdbID: response.data.imdbID,
      },
    });
    let dbReviews;
    let noReview = true;
    let hotTakesSum = 0;
    let reviewLength = 0;
    if (movieExists) {
      dbReviews = await Review.findAll({
        where: {
          movie_id: movieExists.id,
        },
        include: [
          {
            model: User,
            attributes: ["username"],
          },
          {
            model: User,
            as: "reviewCount",
            attributes: ["id"],
          },
        ],
      });
      reviewLength = dbReviews.length ? dbReviews.length : 0; //turnary statment
      dbReviews = dbReviews.map((obj) => {
        const newObj = obj.get({ plain: true });
        hotTakesSum += newObj.rating;
        newObj.reviewCount = newObj.reviewCount.map((voteObj) => {
          return voteObj.ReviewVote;
        });
        newObj.upVote = newObj.reviewCount.filter(
          (voteObj) => voteObj.upVote === true
        ).length;
        newObj.downVote = newObj.reviewCount.filter(
          (voteObj) => voteObj.upVote === false
        ).length;
        // follow line 61 for checking if they voted on a review
        delete newObj.reviewCount;
        return newObj;
      });
      console.log(hotTakesSum);
      console.log(dbReviews.length);
      
      // for sorting by best
      // dbreviews.sort
      dbReviews.sort((a, b) => (a.upVote < b.upVote) ? 1 : ((b.upVote < a.upVote) ? -1 : 0));

      // console.log(dbReviews);
      const userReview = dbReviews.find(
        (obj) => obj.user_id == req.session.userId
      );
      noReview = userReview ? false : true;
    }

    // console.log(dbreviews);
    // console.log("if movie exists", dbreviews[0].user)
    res.locals.prevReviews = dbReviews;
    // console.log(res.locals.prevReviews);
    // const reviews = dbreviews.get({ plain: true});
    const average = (hotTakesSum / reviewLength).toFixed(1);
    // alert(average.toFixed(1));
    console.log(average);
    const data = {
      poster: response.data.Poster,
      title: response.data.Title,
      plot: response.data.Plot,
      year: response.data.Year,
      imdbID: response.data.imdbID,
      hotTakesAvg: average,
      noReview,
    };
    console.log(data);
    for (const rating of response.data.Ratings) {
      data[rating.Source.split(" ")[0]] = rating;
    }
    // res.status(200).json(response.data);
    res.render("moviepage", {
      ...data,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    console.log(error);
    // res.status(500).json(error);
    res.redirect('/')
  }
});

module.exports = router;
