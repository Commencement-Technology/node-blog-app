const express = require("express");
const router = express.Router();
const verifyAuth = require("../middlewares/verfiyAuth");
const {
  createPost,
  deletePost,
  updatePost,
  getPost,
} = require("../controllers/postController");

router.post("/posts", verifyAuth, createPost);
router.delete("/posts/:postId/:userId", verifyAuth, deletePost);

module.exports = router;
