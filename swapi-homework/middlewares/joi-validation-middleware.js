import Joi from "joi";

export const signupSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});

export const characterValidator = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  return next();
};

export const updateCharacterSchema = Joi.object({
  firstName: Joi.string().min(2),
  lastName: Joi.string().min(2),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(30),
});

export const characterValidatorOptional = (req, res, next) => {
  const { error } = updateCharacterSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  return next();
};
