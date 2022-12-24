const Post = require("../models/PostModel");

// Get all posts
exports.getAllPosts = async (req, res, next) => {
  try {
    
    const posts = await Post.find({})
      .populate("author")
      // .select("content createdAt");
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: { posts },
    });
  } catch (error) {
    res.json(error);
  }
};

// Create a new post
exports.createOnePost = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const post = await Post.create({
      ...req.body,
      content: req.body.content,
      author: userId,
    });

    res.status(200).json({
      status: "success",
      data: { post },
    });
  } catch (error) {
    next(error);
  }
};

// Update a new post
exports.updateOnePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndUpdate(
      postId,
      { seededList: req.body.updatedData },
      { new: true, runValidator: true }
    );
    console.log(post);
    res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a new post
exports.deleteOnePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndDelete(postId);
    res.status(200).json({
      status: "success",
      message: "This post has been deleted",
    });
  } catch (error) {
    next(error);
  }
};
