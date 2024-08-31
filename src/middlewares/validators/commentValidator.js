const { body, param, query } = require("express-validator");

const validateCreateComment = [
  body("content").notEmpty().withMessage("Content is required"),
  body("postId").isMongoId().withMessage("Invalid post ID"),
  body("userId").isMongoId().withMessage("Invalid user ID"),
];

const validateEditComment = [
  param("commentId").isMongoId().withMessage("Invalid comment ID"),
  body("content").notEmpty().withMessage("Content is required"),
];

const validateGetComments = [
  param("postId").optional().isMongoId().withMessage("Invalid post ID"),
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

const validateDeleteComment = [
  param("commentId").isMongoId().withMessage("Invalid comment ID"),
];

const validateLikeComment = [
  param("commentId").isMongoId().withMessage("Invalid comment ID"),
];

module.exports = {
  validateCreateComment,
  validateEditComment,
  validateGetComments,
  validateDeleteComment,
  validateLikeComment,
};
