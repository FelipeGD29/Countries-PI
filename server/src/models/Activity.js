const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Activity",
    {
      ID: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.INTEGER,
        validate: { min: 1, max: 5 },
      },
      duration: {
        type: DataTypes.INTEGER,
        validate: { min: 0 },
      },
      season: {
        type: DataTypes.ENUM(["Summer", "Fall", "Winter", "Spring"]),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
