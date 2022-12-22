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
    // console.log(req);

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
    // res.json(error);
    next(error);
  }
};

// Update a new post
exports.updateOnePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    // console.log(...req.body.updatedData);
    // console.log(req.body.updatedData);
    const post = await Post.findByIdAndUpdate(
      postId,
      { seededList: req.body.updatedData },
      // { seededList: ['631c8a5d3494ddb81c6f2fa9' ]},
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
