const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "An Article must have a title"],
    unique: true,
    maxlength: [1000, "Title cannot be greater than 1000 characters"],
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
    type: [String],
    required: [true, "Author is required"],
  },
  publisher: {
    type: String,
    required: [false],
  },
  tags: {
    type: [String],
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
