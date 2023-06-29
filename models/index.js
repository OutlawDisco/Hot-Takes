const User = require('./User');
const Movie = require('./Movie');
const Review = require('./Review');


Movie.hasMany(Review, {
  foreignKey: 'reviews_id',
});

Movie.belongsTo(Review, {
  foreignKey: 'reviews_id',
});

module.exports = { User, Movie, Review};