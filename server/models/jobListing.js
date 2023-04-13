const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const jobListingSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    phoneNo: {
      type: String,
      required: true,
    },

    payment: {
      type: Number,
      required: true
    },

    germanLang: {
      type: String,
      enum: ["no", "beginner", "intermediate", "advanced", "fluent"],
      default: "no",
      required: true,
    },

    postedBy: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const JobListing = mongoose.model("JobListing", jobListingSchema);

module.exports = JobListing;
