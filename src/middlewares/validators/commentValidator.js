const { body, param, query } = require("express-validator");

const validateCreateComment = [
  body("content").notEmpty().withMessage("Content is required"),
  body("postId").notEmpty().withMessage("Content is required"),
  body("userId").notEmpty().withMessage("Content is required"),
];

const validateEditComment = [
  body("content").notEmpty().withMessage("Content is required"),
];

const validateGetComments = [
  query("startFrom")
    .optional()
    .isInt({ min: 0 })
    .withMessage("startFrom should be a non-negative integer"),
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("limit should be a positive integer"),
  query("sort")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Sort should be either 'asc' or 'desc'"),
];

module.exports = {
  validateCreateComment,
  validateEditComment,
  validateGetComments,
};
