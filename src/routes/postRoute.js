const express = require("express");
const router = express.Router();
const verifyAuth = require("../middlewares/verfiyAuth");
const {
  createPost,
  deletePost,
  updatePost,
  getPosts,
} = require("../controllers/postController");

const {
  validateCreatePost,
  validateGetPosts,
  validateDeletePost,
  validateUpdatePost,
} = require("../middlewares/validators/postValidator");

/**
 * @openapi
 * '/posts':
 *  post:
 *     tags:
 *     - Posts
 *     summary: Create a new post
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - content
 *            properties:
 *              title:
 *                type: string
 *                example: "My First Post"
 *              content:
 *                type: string
 *                example: "This is the content of my first post."
 *              image:
 *                type: string
 *                example: "http://example.com/image.jpg"
 *              category:
 *                type: string
 *                example: "Technology"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      201:
 *        description: Post created successfully
 *      500:
 *        description: Server error
 */
router.post("/posts", verifyAuth, validateCreatePost, createPost);

/**
 * @openapi
 * '/posts/{postId}/{userId}':
 *  delete:
 *     tags:
 *     - Posts
 *     summary: Delete a post by ID
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: The post has been deleted
 *      403:
 *        description: You are not allowed to delete this post
 *      404:
 *        description: Post not found
 *      500:
 *        description: Server error
 */
router.delete(
  "/posts/:postId/:userId",
  verifyAuth,
  validateDeletePost,
  deletePost
);

/**
 * @openapi
 * '/posts/{postId}':
 *  put:
 *     tags:
 *     - Posts
 *     summary: Update a post by ID
 *     parameters:
 *       - name: postId
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
 *              title:
 *                type: string
 *                example: "Updated Post Title"
 *              content:
 *                type: string
 *                example: "Updated content of the post."
 *              category:
 *                type: string
 *                example: "Technology"
 *              image:
 *                type: string
 *                example: "http://example.com/updated-image.jpg"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: Post updated successfully
 *      403:
 *        description: You are not allowed to update this post
 *      404:
 *        description: Post not found
 *      500:
 *        description: Server error
 */
router.put("/posts/:postId", verifyAuth, validateUpdatePost, updatePost);

/**
 * @openapi
 * '/posts':
 *  get:
 *     tags:
 *     - Posts
 *     summary: Get all posts
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
 *       - name: userId
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: category
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: slug
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: searchTerm
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *      200:
 *        description: Successfully retrieved posts
 *      500:
 *        description: Server error
 */
router.get("/posts", validateGetPosts, getPosts);

module.exports = router;
