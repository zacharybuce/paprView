const mongoose = require("mongoose");

ObjectId = mongoose.Types.ObjectId;

const SummarySchema = new mongoose.Schema({
  body: {},
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
  postdate: {
    type: Date,
    required: [true, "Must have a postDate"],
  },
  lastedit: {
    type: Date,
    required: [false],
  },
});

module.exports =
  mongoose.models.Summary || mongoose.model("Summary", SummarySchema);
