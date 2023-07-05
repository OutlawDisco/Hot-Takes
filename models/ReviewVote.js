const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ReviewVote extends Model {}

ReviewVote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    upVote: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    review_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "review",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "ReviewVote",
  }
);

module.exports = ReviewVote;