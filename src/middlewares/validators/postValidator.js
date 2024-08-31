const { body, param, query } = require("express-validator");

const validateCreatePost = [
  body("content").notEmpty().withMessage("Content is required"),
  body("title").notEmpty().withMessage("Title is required"),
  body("image").optional().isURL().withMessage("Provide a valid image URL"),
  body("category").notEmpty().withMessage("Category is required"),
];

const validateGetPosts = [
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
  query("userId").optional().isMongoId().withMessage("Invalid user ID"),
  query("category")
    .optional()
    .notEmpty()
    .withMessage("Category cannot be empty"),
  query("slug").optional().notEmpty().withMessage("Slug cannot be empty"),
  query("postId").optional().isMongoId().withMessage("Invalid post ID"),
  query("searchTerm")
    .optional()
    .isString()
    .withMessage("Search term must be a string"),
];

const validateDeletePost = [
  param("postId").isMongoId().withMessage("Invalid post ID"),
  param("userId").isMongoId().withMessage("Invalid user ID"),
];

const validateUpdatePost = [
  param("postId").isMongoId().withMessage("Invalid post ID"),
  body("title").optional().notEmpty().withMessage("Title cannot be empty"),
  body("content").optional().notEmpty().withMessage("Content cannot be empty"),
  body("category")
    .optional()
    .notEmpty()
    .withMessage("Category cannot be empty"),
  body("image").optional().isURL().withMessage("Provide a valid image URL"),
];

module.exports = {
  validateCreatePost,
  validateGetPosts,
  validateDeletePost,
  validateUpdatePost,
};
