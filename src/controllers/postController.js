const Post = require("../models/Post");

const createPost = async (req, res) => {
  const userId = req.user.id;
  const { content, title, image, category } = req.body;
  const slug = title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newPost = new Post({
    userId,
    content,
    title,
    image,
    category,
    slug,
  });

  try {
    await newPost.save();

    res.status(201).json({
      success: true,
      newPost,
      message: "Post created successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occured in createPost controller",
      error,
    });
  }
};

const getPosts = async (req, res) => {};

const deletePost = async (req, res) => {
  if (req.user.id !== req.params.userId) {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to delete this post",
    });
  }

  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({
      success: true,
      message: "The post has been deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred in deletePost controller",
      error,
    });
  }
};

const updatePost = async (req, res) => {};

module.exports = {
  createPost,
  getPosts,
  deletePost,
  updatePost,
};
