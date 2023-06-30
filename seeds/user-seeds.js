const { User } = require("../models");

const userData = [
  {
    username: "AOutlaw-Lyons",
    email: "outlaw@yahoo.com",
    password: "comicdealer",
  },
  {
    username: "BConnolly",
    email: "connolly-b@gmail.com",
    password: "imasom",
  },
  {
    username: "A-Franks",
    email: "adrianfranks@hotmail.com",
    password: "rideShadowFax",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
