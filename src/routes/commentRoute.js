const express = require("express");
const verfiyAuth = require("../middlewares/verfiyAuth");
const router = express.Router();
const {
  createComment,
  getComments,
  deleteComment,
  editComment,
} = require("../controllers/commentController");

router.post("/comments", verfiyAuth, createComment);
router.get("/comments/:postId", verfiyAuth, getComments);
router.get("/comments", verfiyAuth, getComments);
router.delete("/comments/:commentId", verfiyAuth, deleteComment);
router.put("/comments/:commentId", verfiyAuth, editComment);

module.exports = router;
