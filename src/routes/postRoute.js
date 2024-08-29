const express = require("express");
const router = express.Router();
const verifyAuth = require("../middlewares/verfiyAuth");
const {
  createPost,
  deletePost,
  updatePost,
  getPosts,
} = require("../controllers/postController");

router.post("/posts", verifyAuth, createPost);
router.delete("/posts/:postId/:userId", verifyAuth, deletePost);
router.put("/posts/:postId", verifyAuth, updatePost);
router.get("/posts", getPosts);

module.exports = router;
