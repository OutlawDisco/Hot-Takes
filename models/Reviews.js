const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Review extends Model {}

Review.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  rating: {
      type: DataTypes.INTEGER,
      validate: {
          min: 0,
          max: 10
      }
  },
  take: {
      type: DataTypes.TEXT,
      allowNull: false,

  }
},
{
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'Review'
}
);

module.exports = Review
