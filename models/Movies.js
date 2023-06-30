const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Movie extends Model {}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allownull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    imdbID: {
      type: DataTypes.STRING,
      allownull: false,
    }
    // title: {
    //   type: DataTypes.STRING,
    //   allownull: false,
    // },
    // plot: {
    //   type: DataTypes.TEXT,
    //   allownull: false,
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: "Movie",
  }
);

module.exports = Movie;
