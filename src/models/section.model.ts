import { duration } from "moment";

const mongoose = require("mongoose");
const sectionSchema = mongoose.Schema(
  {
    sectionName: {
      type: String,
      require: true,
    },
    sectionDescription: {
      type: String,
      require: true,
    },
    duration: {
      type: Number,
      require: true,
    },
    isMainTask: {
      type: Boolean,
      default: false,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
export const sectionModel = mongoose.model("Section", sectionSchema);
