const mongoose = require("mongoose");

const JobListing = require("../models/jobListing");
const User = require("../models/auth");
const { createJobValidation } = require("../utils/jobValidation")

const getJobs = async (req, res, next) => {
  try {
    JobListing.find()
      .populate("postedBy")
      .exec(function (err, jobs) {
        if (err) console.error(err);

        res.json({ error: false, jobs });
      });
  } catch (error) {
    next(error);
  }
};

const getJob = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error(`🔍 No job with id: ${id}`);
    }

    JobListing.findById(id)
      .populate("postedBy")
      .exec(function (err, job) {
        if (err) console.error(err);

        if (!job)
          return res.json({
            error: true,
            message: `🔍 No job with id: ${id}`,
          });

        res.json({ error: false, job });
      });
  } catch (error) {
    next(error);
  }
};

const createJob = async (req, res, next) => {
  const { title, description, location, phoneNo, payment, germanLang, postedBy } = req.body;
 
  try {
    // Validation
    const { error } = createJobValidation({ title, description, location, phoneNo, payment, germanLang: germanLang.toLowerCase() });

    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }

    const user = await User.findById(req.userId);
    
    if (user.role === "orgnaization") {
      res.status(403);
      throw new Error(`❌ Orgnaization role cannot post a job!`);
    }
    
    const newJob = await JobListing.create({ title, description, location, phoneNo, payment, germanLang, postedBy });

    res.status(200).json({ error: false, post: newJob });
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  const { id } = req.params;
  
  const { title, description, location, phoneNo, payment, germanLang, postedBy } = req.body;

  try {
    // Validation
    const { error } = createJobValidation({ title, description, location, phoneNo, payment, germanLang: germanLang.toLowerCase() });

    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error(`🔍 No Job with id: ${id}`);
    }

    const job = await JobListing.findById(id);

    if (!job) {
      res.status(404);
      throw new Error(`🔍 No Job with id: ${id}`);
    }

    const updatedJob = { title, description, location, phoneNo, payment, germanLang, postedBy, _id: id };

    const newJob = await JobListing.findByIdAndUpdate(id, updatedJob, { new: true });

    res.json({ error: false, newJob });
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error(`🔍 No job with id: ${id}`);
    }

    const job = await JobListing.findById(id);

    if (!job) {
      res.status(404);
      throw new Error(`🔍 No job with id: ${id}`);
    }

    await JobListing.findByIdAndDelete(id);

    res.json({ error: false, message: "🗑️ Job deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

const profilePosts = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error(`🔍 No user with id: ${id}`);
    }

    const user = await User.findById(id);

    if (!user) {
      res.status(404);
      throw new Error(`🔍 No user with id: ${id}`);
    }

    JobListing.find({ postedBy: id })
      .populate("postedBy")
      .exec(function (err, jobs) {
        if (err) console.error(err);

        res.json({ error: false, jobs, user });
      });
  } catch (error) {
    next(error);
  }
};

module.exports = { getJobs, getJob, createJob, updateJob, deleteJob, profilePosts };
