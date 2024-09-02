import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  asset: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Asset",
    required: true,
  },
  assignedDate: {
    type: Date,
    default: Date.now,
  },
});
const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;
