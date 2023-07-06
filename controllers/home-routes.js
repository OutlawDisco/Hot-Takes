const router = require("express").Router();
const movieTitles = [
  "Ghostbusters",
  "Milo and Otis",
  "Aliens",
  "Bullet Train",
  "Crouching Tiger Hidden Dragon"
];

router.get("/", async (req, res) => {
  try {
    let movieInfo = [];
    for (const movie of movieTitles) {
      const response = await axios.get(
        `http://www.omdbapi.com/?t=${movie}&apikey=${process.env.MOVIE_API}`
      );
  movieInfo.push({
    poster: response.data.Poster,
    imdbID: response.data.imdbID,
  })
    }
    res.render("homepage", {
      loggedIn: req.session.loggedIn,
      movieInfo,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/login", (req, res) => res.render("login"));
router.get("/signup", (req, res) => res.render("signup"));

module.exports = router;
