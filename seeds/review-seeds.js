const { Review } = require("../models");

const reviewData = [
  {
    rating: 10,
    take: "A movie about ghost busting starring the man, the myth, the legend, Bill Murray!!!!",
    movie_id: 1,
    user_id: 1,
  },
  {
    rating: 10,
    take: "the best animated movie ever, should have won the grammy for best picture",
    movie_id: 2,
    user_id: 2,
  },
];

const seedReviews = () => Review.bulkCreate(reviewData);

module.exports = seedReviews;
