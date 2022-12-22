const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Post must have content"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tag: {
      type: String,
    },
    counterSeed: {
      type: Number,
    },
    counterFlag: {
      type: Number,
    },
    seededList: {
      type: Array,
    },
    flagedList: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
