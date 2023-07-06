const User = require("./User");
const Movie = require("./Movies");
const Review = require("./Review");
const ReviewVote = require("./ReviewVote");

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

Review.belongsToMany(User, {
  foreignKey: "review_id", 
  through: ReviewVote,
  as: 'reviewCount',
});

User.belongsToMany(Review, {
  foreignKey: "user_id",
  through: ReviewVote,
  as: 'userVote',
});




module.exports = { User, Movie, Review, ReviewVote};
