const mongoose = require("mongoose");

ObjectId = mongoose.Types.ObjectId;

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must have a tag name"],
    unique: true,
  },
});

module.exports = mongoose.models.Tag || mongoose.model("Tag", TagSchema);
