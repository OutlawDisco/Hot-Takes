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
    // let movieExists = await Movie.findOne({
    //     where: {
    //         imdbID: response.data.imdbID,
    //     }
    // })
    // let dbreviews;
    // if (movieExists) {
    //     dbreviews = await Review.findAll({
    //         where: {
    //             movie_id: movieExists.id,
    //         },
    //     })
    // }
    // console.log(dbreviews)
    // res.render("moviepage", reviews);
    // const reviews = dbreviews.get({ plain: true});

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

// try getting the reviews that go with a movie inside a get call with same endpoint
// router.get("/", async (req, res) => {
//   try {
//     let movieExists = await Movie.findOne({
//       where: {
//         imdbID: response.data.imdbID,
//       },
//     });
//     console.log(movieExists);
//     let dbreviews;
//     if (movieExists) {
//       dbreviews = await Review.findAll({
//         where: {
//           movie_id: movieExists.id,
//         },
//       });
//     }
//     console.log(dbreviews);
//     res.render("moviepage", dbreviews);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// });
// let movieExists = await Movie.findOne({
//   where: {
//       imdbID: response.data.imdbID,
//   }
// })
// let dbreviews;
// if (movieExists) {
//   dbreviews = await Review.findAll({
//       where: {
//           movie_id: movieExists.id,
//       },
//   })
// }
// console.log(dbreviews)

module.exports = router;
