const sequelize = require("../config/connection");
const seedUsers = require("./userData");
const seedReviews = require("./reviewData");
const seedMovies = require("./moviesData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedReviews();

  await seedMovies();

  process.exit(0);
};

seedAll();
