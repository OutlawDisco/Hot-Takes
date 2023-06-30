const seedUsers = require("./user-seeds");
const seedMovies = require("./movie-seeds");
const seedReviews = require("./review-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedMovies();

  await seedReviews();

  process.exit(0);
};

seedAll();
