const { Movie } = require("../models");

const movieData = [
  {
    title: "Ghostbusters",
    plot: "new york city ghost hunters",
  },
  {
    title: "Ice Age",
    plot: "the best animated movie ever, should have won the grammy for best picture",
  },
];

const seedMovies = () => Movie.bulkCreate(movieData);

module.exports = seedMovies;
