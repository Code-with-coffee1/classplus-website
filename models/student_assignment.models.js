const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const studentAssignmentSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: ObjectId,
      ref: "assignment",
      required: true,
    },
    submittedBy: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    pdfName: {
      type: String,
    },
    pdfSize: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("student_assignment", studentAssignmentSchema);
