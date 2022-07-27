const mongoose = require("mongoose");
const { Schema } = mongoose;

const apiSchema = new Schema({
  schema_version: Number,
  email: String,
  password: String,
  created_at: { type: Date, default: Date.now },
  last_active_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Api", apiSchema);
