const express = require("express");
const router = express.Router();
const { getUser, deleteUser } = require("../controllers/userController");
const verifyAuth = require("../middlewares/verfiyAuth");

router.get("/users/:userId", getUser);
router.delete("/users/:userId", verifyAuth, deleteUser);

module.exports = router;
