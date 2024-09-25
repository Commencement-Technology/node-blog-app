const express = require("express");
const verifyAuth = require("../middlewares/verifyAuth");
const router = express.Router();
const {
  createComment,
  getComments,
  deleteComment,
  editComment,
  likeComment,
} = require("../controllers/commentController");

const {
  validateCreateComment,
  validateEditComment,
  validateGetComments,
} = require("../middlewares/validators/commentValidator");

/**
 * @openapi
 * '/comments':
 *  post:
 *     tags:
 *     - Comments
 *     summary: Create a new comment
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - content
 *              - postId
 *            properties:
 *              content:
 *                type: string
 *                example: "This is a comment"
 *              postId:
 *                type: string
 *                example: "60c72b2f9b1e8c10a8f9d2a9"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      201:
 *        description: Comment created successfully
 *      403:
 *        description: You are not allowed to create this comment
 *      500:
 *        description: Server error
 */
router.post("/comments", verifyAuth, validateCreateComment, createComment);

/**
 * @openapi
 * '/comments/{postId}':
 *  get:
 *     tags:
 *     - Comments
 *     summary: Get all comments for a post
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      200:
 *        description: Successfully retrieved comments
 *      500:
 *        description: Server error
 */
router.get("/comments/:postId", verifyAuth, validateGetComments, getComments);

/**
 * @openapi
 * '/comments':
 *  get:
 *     tags:
 *     - Comments
 *     summary: Get all comments
 *     parameters:
 *       - name: startFrom
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *       - name: sort
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - name: postId
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *      200:
 *        description: Successfully retrieved comments
 *      500:
 *        description: Server error
 */
router.get("/comments", verifyAuth, validateGetComments, getComments);

/**
 * @openapi
 * '/comments/{commentId}':
 *  delete:
 *     tags:
 *     - Comments
 *     summary: Delete a comment by ID
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: Comment deleted successfully
 *      403:
 *        description: You are not allowed to delete this comment
 *      404:
 *        description: Comment not found
 *      500:
 *        description: Server error
 */
router.delete("/comments/:commentId", verifyAuth, deleteComment);

/**
 * @openapi
 * '/comments/{commentId}':
 *  put:
 *     tags:
 *     - Comments
 *     summary: Edit a comment by ID
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              content:
 *                type: string
 *                example: "This is an updated comment"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: Comment updated successfully
 *      403:
 *        description: You are not allowed to update this comment
 *      404:
 *        description: Comment not found
 *      500:
 *        description: Server error
 */
router.put(
  "/comments/:commentId",
  validateEditComment,
  verifyAuth,
  editComment
);

/**
 * @openapi
 * '/comments/like/{commentId}':
 *  put:
 *     tags:
 *     - Comments
 *     summary: Like or unlike a comment by ID
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: Like status of the comment has been updated
 *      404:
 *        description: Comment not found
 *      500:
 *        description: Server error
 */
router.put("/comments/like/:commentId", verifyAuth, likeComment);

module.exports = router;
