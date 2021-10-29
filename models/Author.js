const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectID;

const AuthorSchema = new mongoose.Schema({
  articles: {
    type: [ObjectId],
    required: [false],
    unique: true,
  },
  user: {
    type: ObjectId,
    required: [false],
    unique: true,
  },
  tag: {
    type: ObjectId,
    required: [false],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "An Author must have a name"],
    unique: false,
    maxlength: [40, "Author name cannot be greater than 40 characters"],
  },
});

module.exports =
  mongoose.models.Author || mongoose.model("Author", AuthorSchema);
