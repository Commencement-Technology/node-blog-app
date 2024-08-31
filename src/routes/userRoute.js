const express = require("express");
const router = express.Router();
const {
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const verifyAuth = require("../middlewares/verfiyAuth");

const {
  validateGetUser,
  validateDeleteUser,
  validateUpdateUser,
} = require("../middlewares/validators/userValidator");
/**
 * @openapi
 * '/users/{userId}':
 *  get:
 *     tags:
 *     - User
 *     summary: Get a user by ID
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      200:
 *        description: Successfully retrieved user data
 *      404:
 *        description: User not found
 *      500:
 *        description: Server error
 */
router.get("/users/:userId", validateGetUser, getUser);

/**
 * @openapi
 * '/users/{userId}':
 *  delete:
 *     tags:
 *     - User
 *     summary: Delete a user by ID
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: User deleted successfully
 *      404:
 *        description: User not found
 *      500:
 *        description: Server error
 */
router.delete("/users/:userId", verifyAuth, validateDeleteUser, deleteUser);

/**
 * @openapi
 * '/users/{userId}':
 *  put:
 *     tags:
 *     - User
 *     summary: Update a user by ID
 *     parameters:
 *       - name: userId
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
 *              username:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              profilePicture:
 *                type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: User updated successfully
 *      403:
 *        description: You are not allowed to update this user
 *      404:
 *        description: User not found
 *      500:
 *        description: Server error
 */
router.put("/users/:userId", verifyAuth, validateUpdateUser, updateUser);

module.exports = router;
