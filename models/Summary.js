const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const SummarySchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Must have a body"],
  },
  article: {
    type: ObjectId,
    required: [true, "Must have an article"],
  },
  upvotes: {
    type: Number,
    required: [true, "Must have an amount of upvotes"],
  },
  downvotes: {
    type: Number,
    required: [true, "Must have an amount of downvotes"],
  },
  lastedit: {
    type: Date,
    required: [true, "Must have a lastedit date"],
  },
  user: {
    type: ObjectId,
    required: [true, "Must have a User"],
  },
});

module.exports =
  mongoose.models.Summary || mongoose.model("Summary", SummarySchema);
