const User = require("./User");
const Movie = require("./Movie");
const Review = require("./Review");

Movie.hasMany(Review, {
  foreignKey: "movie_id",
  onDelete: "CASCADE",
});

Review.belongsTo(Movie, {
  foreignKey: "movie_id",
});


module.exports = { User, Movie, Review };
