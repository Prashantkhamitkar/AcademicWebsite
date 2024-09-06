module.exports = (sequelize, DataTypes) => {
  const Meeting = sequelize.define("Meeting", {
    meetingId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER, // Duration in minutes
      allowNull: false,
    },
    hostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  });

  return Meeting;
};
