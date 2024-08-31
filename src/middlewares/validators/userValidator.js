const { body, param } = require("express-validator");

const validateGetUser = [
  param("userId").isMongoId().withMessage("Invalid user ID"),
];

const validateUpdateUser = [
  param("userId").isMongoId().withMessage("Invalid user ID"),
  body("email").isEmail().withMessage("Provide a valid email"),
  body("profilePicture").isURL().withMessage("Provide a valid picture format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const validateDeleteUser = [
  param("userId").isMongoId().withMessage("Invalid user ID"),
];

module.exports = {
  validateDeleteUser,
  validateGetUser,
  validateUpdateUser,
};
