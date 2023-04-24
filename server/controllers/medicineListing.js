const mongoose = require("mongoose");

const medicineListing = require("../models/medicineListing");
const User = require("../models/auth");
const { createmedicineValidation } = require("../utils/medicineValidation")

const getmedicines = async (req, res, next) => {
  try {
    medicineListing.find()
      .populate("postedBy")
      .exec(function (err, medicines) {
        if (err) console.error(err);

        res.json({ error: false, medicines });
      });
  } catch (error) {
    next(error);
  }
};

const getmedicine = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error(`🔍 No medicine with id: ${id}`);
    }

    medicineListing.findById(id)
      .populate("postedBy")
      .exec(function (err, medicine) {
        if (err) console.error(err);

        if (!medicine)
          return res.json({
            error: true,
            message: `🔍 No medicine with id: ${id}`,
          });

        res.json({ error: false, medicine });
      });
  } catch (error) {
    next(error);
  }
};

const createmedicine = async (req, res, next) => {
  const { name, description, expiry, manf, qty, condition, contact, image, postedBy } = req.body;
 
  try {
    // Validation
    // const { error } = createmedicineValidation({ name, description, expiry, manf, qty, condition: condition.toLowerCase(), contact });

    // if (error) {
    //   res.status(400);
    //   throw new Error(error.details[0].message);
    // }

    const user = await User.findById(req.userId);
    
    if (user.role === "orgnaization") {
      res.status(403);
      throw new Error(`❌ Orgnaization role cannot post a medicine!`);
    }
    
    const newmedicine = await medicineListing.create({ name, description, expiry, manf, qty, condition, contact, image, postedBy });

    res.status(200).json({ error: false, post: newmedicine });
  } catch (error) {
    next(error);
  }
};

const updatemedicine = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, expiry, manf, qty, condition, contact, image, postedBy } = req.body;
  
  
  try {
    // // Validation
    // const { error } = createmedicineValidation({ title, description, location, phoneNo, payment, germanLang: germanLang.toLowerCase() });

    // if (error) {
    //   res.status(400);
    //   throw new Error(error.details[0].message);
    // }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error(`🔍 No medicine with id: ${id}`);
    }

    const medicine = await medicineListing.findById(id);

    if (!medicine) {
      res.status(404);
      throw new Error(`🔍 No medicine with id: ${id}`);
    }

    const updatedmedicine = { name, description, expiry, manf, qty, condition, contact, image: image ? image : medicine.image, postedBy, _id: id };

    const newmedicine = await medicineListing.findByIdAndUpdate(id, updatedmedicine, { new: true });

    res.json({ error: false, newmedicine });
  } catch (error) {
    next(error);
  }
};

const deletemedicine = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error(`🔍 No medicine with id: ${id}`);
    }

    const medicine = await medicineListing.findById(id);

    if (!medicine) {
      res.status(404);
      throw new Error(`🔍 No medicine with id: ${id}`);
    }

    await medicineListing.findByIdAndDelete(id);

    res.json({ error: false, message: "🗑️ medicine deleted successfully!" });
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

    medicineListing.find({ postedBy: id })
      .populate("postedBy")
      .exec(function (err, medicines) {
        if (err) console.error(err);

        res.json({ error: false, medicines, user });
      });
  } catch (error) {
    next(error);
  }
};

module.exports = { getmedicines, getmedicine, createmedicine, updatemedicine, deletemedicine, profilePosts };
