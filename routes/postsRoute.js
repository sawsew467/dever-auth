const express = require("express");

const {
  getAllPosts,
  createOnePost,
  updateOnePost,
  deleteOnePost,
} = require("../controllers/postsController");

const { verifyToken } = require("../middlewares/verifyToken");

const Router = express.Router();

Router.route("/").get(getAllPosts).post(verifyToken, createOnePost);

Router.route("/:postId").put(updateOnePost).delete(deleteOnePost);

module.exports = Router;
