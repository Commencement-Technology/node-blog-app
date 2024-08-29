const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");

/**
 * @openapi
 * '/login':
 *  post:
 *     tags:
 *     - Authentication
 *     summary: Register a new user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - email
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                default: johndoe
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      201:
 *        description: User created successfully
 *      409:
 *        description: Email already exists
 *      400:
 *        description: Validation Error
 *      500:
 *        description: Server Error
 */
router.post("/login", login);

/**
 * @openapi
 * '/register':
 *  post:
 *     tags:
 *     - Authentication
 *     summary: Register a new user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - email
 *              - password
 *              - role
 *            properties:
 *              username:
 *                type: string
 *                default: alitalhacoban
 *              email:
 *                type: string
 *                default: user@mail.com
 *              password:
 *                type: string
 *                default: 123456
 *     responses:
 *      201:
 *        description: User created successfully
 *      400:
 *        description: User already exists
 *      500:
 *        description: Server Error
 */
router.post("/register", register);

module.exports = router;
