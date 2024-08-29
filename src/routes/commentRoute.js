const express = require("express");
const verfiyAuth = require("../middlewares/verfiyAuth");
const router = express.Router();
const {
  createComment,
  getComments,
} = require("../controllers/commentController");

router.post("/comments", verfiyAuth, createComment);
router.get("/comments/:postId", verfiyAuth, getComments);
router.get("/comments", verfiyAuth, getComments);

module.exports = router;
