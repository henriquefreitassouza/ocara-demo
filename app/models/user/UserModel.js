const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  schema_version: Number,
  name: String,
  surname: String,
  picture: String,
  cover: String,
  bio: String,
  created_at: { type: Date, default: Date.now },
  account: { type: Schema.Types.ObjectId, ref: "Account" },
  stats: {
    total_comments: Number,
    total_rsvp: Number,
    total_events: Number
  }
});

module.exports = mongoose.model("User", userSchema);
