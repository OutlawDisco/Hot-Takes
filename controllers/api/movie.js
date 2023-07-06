const router = require("express").Router();
const axios = require("axios");
const { Movie, Review, User } = require('../../models/')
const ReviewVote = require('../../models/ReviewVote');

// /api/movie
router.get("/", async (req, res) => {
  try {
    let response;
    if(req.query.title){
     response = await axios.get(
      `http://www.omdbapi.com/?t=${req.query.title}&apikey=${process.env.MOVIE_API}`
    );
    } else if(req.query.imdbID){
      response = await axios.get(
        `http://www.omdbapi.com/?i=${req.query.imdbID}&apikey=${process.env.MOVIE_API}`
      );
    }
    

    //check against database with imdbID, if exists get all reviews
    let movieExists = await Movie.findOne({
        where: {
            imdbID: response.data.imdbID,
        }
    })
    let dbreviews;
    let noReview = true;
    if (movieExists) {
        dbreviews = await Review.findAll({
            where: {
                movie_id: movieExists.id,
            }, 
            include: [
              {
                model: User,
                attributes: ['username'],
              },
              {
                model: User,
                as: 'reviewCount',
                attributes: ['id'],
              },
            ],
        })
        dbreviews = dbreviews.map(obj => {
          const newObj = obj.get({ plain: true });
          newObj.reviewCount = newObj.reviewCount.map(voteObj => {
            return voteObj.ReviewVote;
          })
          newObj.upVote = newObj.reviewCount.filter(voteObj => voteObj.upVote === true).length
          newObj.downVote = newObj.reviewCount.filter(voteObj => voteObj.upVote === false).length
          // follow line 61 for checking if they voted on a review
          delete newObj.reviewCount;
          return newObj;
        })
        // for sorting by best 
        // dbreviews.sort
        
        console.log(dbreviews);
        const userReview = dbreviews.find(obj => obj.user_id == req.session.userId); 
        noReview = userReview ? false : true;
      };
      
      // console.log(dbreviews);
    // console.log("if movie exists", dbreviews[0].user)
    res.locals.prevReviews = dbreviews;
    // console.log(res.locals.prevReviews);
    // const reviews = dbreviews.get({ plain: true});

    const data = {
      poster: response.data.Poster,
      title: response.data.Title,
      plot: response.data.Plot,
      year: response.data.Year,
      imdbID: response.data.imdbID,
      noReview
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
