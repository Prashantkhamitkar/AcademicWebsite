module.exports = (sequelize, DataTypes) => {
  const MeetingRecording = sequelize.define("MeetingRecording", {
    meetingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Meetings",
        key: "id",
      },
    },
    recordingUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return MeetingRecording;
};
