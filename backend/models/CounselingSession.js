import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const CounselingSession = sequelize.define("CounselingSession", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  student_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  session_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  session_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "scheduled",
  },
  counselor_name: {
    type: DataTypes.STRING,
  },
  duration_minutes: {
    type: DataTypes.INTEGER,
    defaultValue: 45,
  },
  notes: {
    type: DataTypes.TEXT,
  },
  meeting_link: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});

export default CounselingSession;
