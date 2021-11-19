const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const DisciplineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must have a tag name"],
    unique: true,
  },
  tags: {
    type: [ObjectId],
    required: false,
  },
});

module.exports =
  mongoose.models.Discipline || mongoose.model("Discipline", DisciplineSchema);
