const { body } = require("express-validator");

const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Provide a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long "),
];

const validateRegister = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Provide a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long "),
];

module.exports = {
  validateLogin,
  validateRegister,
};
