const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const jobListingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    expiry: {
      type: String,
      required: true,
    },

    manf: {
      type: String,
      required: true,
    },

    qty: {
      type: Number,
      required: true
    },
    
    condition: {
      type: String,
      enum: ["sealed", "unopened", "partially used"],
      default: "",
      required: true,
    },

    contact: {
      type: String,
      required: true
    },

    image: String,

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
