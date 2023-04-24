const Joi = require("joi");



const createmedicineValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),

    description: Joi.string().required(),

    expiry: Joi.string().required(),
    
    manf: Joi.string().required(),
        
    qty: Joi.number().required(),
    
    condition: Joi.string().lowercase().valid(["sealed", "unopened", "partially used"]),
    
    contact: Joi.string().required(),
  
  });

  return schema.validate(data);
};

module.exports = { createmedicineValidation };
