const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectID;

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must have a tag name"],
    unique: true,
  },
});

module.exports = mongoose.models.Tag || mongoose.model("Tag", TagSchema);
