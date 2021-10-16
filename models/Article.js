const mongoose = require("mongoose");

ObjectId = mongoose.Types.ObjectId;

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "An Article must have a title"],
    unique: true,
    maxlength: [100, "Title cannot be greater than 100 characters"],
  },
  views: {
    type: Number,
    required: [true, "Please add the amount of views"],
  },
  publishDate: {
    type: Date,
    required: [false],
  },
  authors: {
    type: [ObjectId],
    required: [true, "Author is required"],
  },
  tags: {
    type: [ObjectId],
    required: [true, "Tags are required"],
  },
  summaries: {
    type: [ObjectId],
    required: [false],
  },
  comments: {
    type: [ObjectId],
    required: [false],
  },
});

module.exports =
  mongoose.models.Article || mongoose.model("Article", ArticleSchema);
