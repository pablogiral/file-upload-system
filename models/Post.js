const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const User = require("../models/User");

const postSchema = new Schema(
  {
    content: {
      type: String      
    },
    creatorId: {
      type: Schema.Types.ObjectId, ref:"User",
    },
    picName: {
      type: String,
      default: "Post picture"
    },
    picPath: {
      type: String,
    },
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
