const Joi = require("joi");

const createJobValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().min(3).max(50),

    description: Joi.string().required(),

    location: Joi.string().required(),
    
    phoneNo: Joi.string().required(),
        
    payment: Joi.number().required(),

    germanLang: Joi.string().lowercase().valid("no", "beginner", "intermediate", "advanced", "fluent"),

  });

  return schema.validate(data);
};

module.exports = { createJobValidation };
