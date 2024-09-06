module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define("Submission", {
    assignmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Assignments",
        key: "id",
      },
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    submittedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return Submission;
};
