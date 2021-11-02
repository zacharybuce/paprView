const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectID;

const UserSchema = new mongoose.Schema({
  points: {
    type: Number,
    required: [true, "Must have points"],
  },
  name: {
    type: String,
    required: [true, "Must have a name"],
    unique: true,
    maxlength: [15, "name must be less than 15 characters"],
  },
  bio: {
    type: String,
    required: [false],
    maxlength: [100, "bio must be less than 100 characters"],
  },
  job: {
    type: String,
    required: [false],
    maxlength: [50, "job name must be less than 50 characters"],
  },
  degree: {
    type: String,
    required: [false],
    maxlength: [50, "degree name must be less than 50 characters"],
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
  authority: {
    type: String,
    required: [true, "Must have an authority"],
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
