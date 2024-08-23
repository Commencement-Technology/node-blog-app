const express = require("express");
const router = express.Router();
const {
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const verifyAuth = require("../middlewares/verfiyAuth");

router.get("/users/:userId", getUser);
router.delete("/users/:userId", verifyAuth, deleteUser);
router.put("/users/:userId", verifyAuth, updateUser);

module.exports = router;
