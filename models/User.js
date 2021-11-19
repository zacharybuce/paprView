const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const voteSchema = new mongoose.Schema({
  summaryId: {
    type: ObjectId,
    required: [true],
  },
  upvote: {
    type: Boolean,
    required: [true],
  },
  downvote: {
    type: Boolean,
    required: [true],
  },
});

const rankSchema = new mongoose.Schema({
  tag: {
    type: ObjectId,
    required: [true],
  },
  value: {
    type: Number,
    required: [true],
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must have a name"],
    unique: true,
    maxlength: [15, "name must be less than 15 characters"],
  },
  summaries: {
    type: [ObjectId],
    required: [false],
  },
  comments: {
    type: [ObjectId],
    required: [false],
  },
  bookmarks: {
    type: [ObjectId],
    required: [false],
  },
  votes: {
    type: [voteSchema],
    required: [false],
  },
  joinDate: {
    type: Date,
    required: [true],
  },
  ranks: {
    type: [rankSchema],
    required: [false],
  },
  achievements: {
    type: [Object],
    required: [false],
  },
  credibility: {
    type: Number,
    required: [true],
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
