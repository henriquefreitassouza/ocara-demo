const mongoose = require("mongoose");
const { Schema } = mongoose;

const memberSchema = new Schema({
  schema_version: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  name: String,
  surname: String,
  bio: String,
  picture: String,
  badge: String,
  role: String,
  community: String,
  active: Boolean,
  suspended: Boolean,
  stats: {
    total_comments: Number,
    total_rsvp: Number,
    total_events: Number
  }
});

module.exports = mongoose.model("Member", memberSchema);
