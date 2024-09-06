const { Sequelize } = require("sequelize");
const dbConfig = require("../config/config");


const UserModel = require("./user");
const VideoModel = require("./video");
const CourseModel = require("./course");
const EnrollmentModel = require("./enrollment");
const FeedbackModel = require("./feedback");
const MeetingModel = require("./meeting");
const MeetingRecordingModel = require("./meetingRecording");
const NotificationModel = require("./notification");
const SubmissionModel = require("./submission");
const AssignmentModel = require("./assignment");

const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];


const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Initialize models
const db = {
  Sequelize,
  sequelize,
  User: UserModel(sequelize, Sequelize.DataTypes),
  Video: VideoModel(sequelize, Sequelize.DataTypes),
  Course: CourseModel(sequelize, Sequelize.DataTypes),
  Enrollment: EnrollmentModel(sequelize, Sequelize.DataTypes),
  Meeting: MeetingModel(sequelize, Sequelize.DataTypes),
  Feedback: FeedbackModel(sequelize, Sequelize.DataTypes),
  MeetingRecording: MeetingRecordingModel(sequelize, Sequelize.DataTypes),
  Notifications: NotificationModel(sequelize, Sequelize.DataTypes),
  Submission: SubmissionModel(sequelize, Sequelize.DataTypes),
  Assignment: AssignmentModel(sequelize, Sequelize.DataTypes),
};

// Initialize associations
db.User.hasMany(db.Course, { foreignKey: "teacherId" });
db.Course.belongsTo(db.User, { foreignKey: "teacherId" });

db.User.belongsToMany(db.Course, {
  through: db.Enrollment,
  foreignKey: "studentId",
});
db.Course.belongsToMany(db.User, {
  through: db.Enrollment,
  foreignKey: "courseId",
});

db.Course.hasMany(db.Video, { foreignKey: "courseId" });
db.Video.belongsTo(db.Course, { foreignKey: "courseId" });

db.Course.hasMany(db.Meeting, { foreignKey: "courseId" });
db.Meeting.belongsTo(db.Course, { foreignKey: "courseId" });

db.Meeting.hasMany(db.MeetingRecording, { foreignKey: "meetingId" });
db.MeetingRecording.belongsTo(db.Meeting, { foreignKey: "meetingId" });

db.Course.hasMany(db.Assignment, { foreignKey: "courseId" });
db.Assignment.belongsTo(db.Course, { foreignKey: "courseId" });

db.Assignment.hasMany(db.Submission, { foreignKey: "assignmentId" });
db.Submission.belongsTo(db.Assignment, { foreignKey: "assignmentId" });

db.Course.hasMany(db.Feedback, { foreignKey: "courseId" });
db.Feedback.belongsTo(db.Course, { foreignKey: "courseId" });

db.User.hasMany(db.Notifications, { foreignKey: "userId" });
db.Notifications.belongsTo(db.User, { foreignKey: "userId" });

module.exports = db;
