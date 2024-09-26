const Post = require("../models/Post");
const { validationResult } = require("express-validator");

const createPost = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: validationErrors.array(),
    });
  }

  const { content, title, image, category, userId } = req.body;

  if (userId !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to create this post",
    });
  }

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

    return res.status(201).json({
      success: true,
      newPost,
      message: "Post created successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occured while creating a post",
      error: error.message,
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: validationErrors.array(),
      });
    }

    const startFrom = parseInt(req.query.startFrom) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startFrom)
      .limit(limit);

    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    return res.status(200).json({
      success: true,
      totalPosts,
      totalPages,
      posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occured while getting posts",
      error: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: validationErrors.array(),
    });
  }

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
    return res.status(200).json({
      success: true,
      message: "The post has been deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while getting a post",
      error: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: validationErrors.array(),
      });
    }

    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this post",
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Post updated successfully!",
      updatedPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occured while updating post",
      error: error.message,
    });
  }
};

module.exports = {
  createPost,
  getPosts,
  deletePost,
  updatePost,
};
