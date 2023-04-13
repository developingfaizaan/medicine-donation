const express = require("express");

const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  profilePosts,
} = require("../controllers/jobListing");

const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", getJobs);
router.get("/:id", getJob);
router.post("/", auth, createJob);
router.patch("/:id", auth, updateJob);
router.delete("/:id", auth, deleteJob);

router.get("/user/:id", profilePosts);

module.exports = router;
