import { Schema, model } from "mongoose";

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    courseTaken: {
      type: [Schema.ObjectId],
      ref: "Course",
      required: true,
    },
    feesPaid: {
      type: [Schema.ObjectId],
      ref:"Payments"
    },
  },
  {
    timestamps: true,
    overwriteModels: true,
  }
);

const Student = model("Student", studentSchema);

export default Student;