const mongoose = require("mongoose");

ObjectId = mongoose.Types.ObjectId;

const CommentSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    required: [true, "please provide the poster of the comment"],
  },
  body: {
    type: String,
    required: [true, "The comment must have a body"],
  },
  article: {
    type: ObjectId,
    required: [true, "The comment must have an associated Article"],
  },
  quoted: {
    type: ObjectId,
    required: [
      true,
      "Must have a quoted comment. If not replying, use the Article id",
    ],
  },
  isReply: {
    type: Boolean,
    required: [true, "Must destinguish if a reply comment"],
  },
});

module.exports =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
