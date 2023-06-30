const User = require("./User");
const Movie = require("./Movies");
const Review = require("./Review");

Movie.hasMany(Review, {
  foreignKey: "movie_id",
  onDelete: "CASCADE",
});

Review.belongsTo(Movie, {
  foreignKey: "movie_id",
});

User.hasMany(Review, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Review.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Movie, Review };
