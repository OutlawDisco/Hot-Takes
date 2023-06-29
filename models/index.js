const User = require('./User');
const Movie = require('./Movie');
const Reviews = require('./Reviews');


Movie.hasMany(Reviews, {
  foreignKey: 'reviews_id',
});

Movie.belongsTo(Reviews, {
  foreignKey: 'reviews_id',
});

module.exports = { User, Movie, Reviews};