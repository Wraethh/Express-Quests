// Movies

const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;
  const errors = [];

  if (title == null || title === "") {
    errors.push({ field: "title", message: "This field is required" });
  } else if (title.length >= 255) {
    errors.push({
      field: "title",
      message: "Should contain less than 255 characters",
    });
  }
  if (director == null || director === "") {
    errors.push({ field: "director", message: "This field is required" });
  } else if (director.length >= 255) {
    errors.push({
      field: "director",
      message: "Should contain less than 255 characters",
    });
  }
  if (year == null) {
    errors.push({ field: "year", message: "This field is required" });
  } else if (year < 1000 || year >= 10000) {
    errors.push({
      field: "year",
      message: "Invalid year",
    });
  }
  if (color == null) {
    errors.push({ field: "color", message: "This field is required" });
  } else if (color !== 0 || color !== 1) {
    errors.push({
      field: "color",
      message: "Should be 0 or 1",
    });
  }
  if (duration == null) {
    errors.push({ field: "duration", message: "This field is required" });
  } else if (duration >= 1000) {
    errors.push({
      field: "duration",
      message: "Should be less than 1000",
    });
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

// Users

const Joi = require("joi");

const userSchema = Joi.object({
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
  email: Joi.string().email().max(255).required(),
  city: Joi.string().max(255).required(),
  language: Joi.string().max(255).required(),
});

const validateUser = (req, res, next) => {
  const { firstname, lastname, email, city, language } = req.body;

  const { error } = userSchema.validate(
    { firstname, lastname, email, city, language },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = {
  validateMovie,
  validateUser,
};
