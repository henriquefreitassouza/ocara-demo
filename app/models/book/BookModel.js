const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema({
  schema_version: Number,
  title: String,
  isbn: String,
  publisher: String,
  author: [{
    name: String,
    role: String
  }],
  genre: String,
  edition: String,
  year_published: Number,
  taxonomies: [{
    type: String,
    name: String
  }],
  excerpt: String,
  namespace: String,
  cover: String,
  user: { type: Schema.Types.ObjectId, ref: "User"},
  stats: {
    total_views: Number
  }
});

module.exports = mongoose.model("Book", bookSchema);
