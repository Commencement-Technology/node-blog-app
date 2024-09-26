const { body, param } = require("express-validator");

const validateUpdateUser = [
  body("email").optional().isEmail().withMessage("Provide a valid email"),
  body("profilePicture")
    .optional()
    .isURL()
    .withMessage("Provide a valid picture format"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

module.exports = {
  validateUpdateUser,
};
