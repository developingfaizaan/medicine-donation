const express = require("express");

const {
  getmedicines,
  getmedicine,
  createmedicine,
  updatemedicine,
  deletemedicine,
  profilePosts,
} = require("../controllers/medicineListing");

const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", getmedicines);
router.get("/:id", getmedicine);
router.post("/", auth, createmedicine);
router.patch("/:id", auth, updatemedicine);
router.delete("/:id", auth, deletemedicine);

router.get("/user/:id", profilePosts);

module.exports = router;
