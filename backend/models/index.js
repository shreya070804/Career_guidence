import User from "./User.js";
import Resource from "./Resource.js";
import CounselingSession from "./CounselingSession.js";

// Define Associations
User.hasMany(CounselingSession, { foreignKey: "student_id" });
CounselingSession.belongsTo(User, { foreignKey: "student_id" });

export { User, Resource, CounselingSession };
