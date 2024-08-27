const express = require("express");
const router = express.Router();
const verifyAuth = require("../middlewares/verfiyAuth");
const {
  createPost,
  deletePost,
  updatePost,
  getPost,
  getAllPosts,
} = require("../controllers/postController");
const verfiyAuth = require("../middlewares/verfiyAuth");

router.post("/posts", verifyAuth, createPost);
router.delete("/posts/:postId/:userId", verifyAuth, deletePost);
router.put("/posts/:postId", verifyAuth, updatePost);
router.get("/posts/:postId", getPost);
router.get("/posts", getAllPosts);

module.exports = router;
