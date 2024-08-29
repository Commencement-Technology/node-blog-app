const express = require("express");
const verfiyAuth = require("../middlewares/verfiyAuth");
const router = express.Router();
const {
  createComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");

router.post("/comments", verfiyAuth, createComment);
router.get("/comments/:postId", verfiyAuth, getComments);
router.get("/comments", verfiyAuth, getComments);
router.delete("/comments/:commentId", verfiyAuth, deleteComment);

module.exports = router;
