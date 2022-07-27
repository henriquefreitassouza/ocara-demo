const mongoose = require("mongoose");
const { Schema } = mongoose;

const topicSchema = new Schema({
  schema_version: Number,
  title: String,
  description: String,
  member: { type: Schema.Types.ObjectId, ref: "Member" },
  open: Boolean,
  created_at: { type: Date, default: Date.now },
  community: String,
  comments: [{
    description: String,
    member: { type: Schema.Types.ObjectId, ref: "Member" },
    stats: {
      total_likes: Number
    }
  }],
  stats: {
    total_comments: Number
  },
});

module.exports = mongoose.model("Topic", topicSchema);
