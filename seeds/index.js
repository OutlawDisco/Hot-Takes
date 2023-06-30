const sequelize = require("../config/connection");
const seedUsers = require("./user-seeds");
const seedReviews = require("./review-seeds");
const seedMovies = require("./movie-seeds");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedReviews();

  await seedMovies();

  process.exit(0);
};

seedAll();
