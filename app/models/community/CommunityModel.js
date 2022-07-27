const mongoose = require("mongoose");
const { Schema } = mongoose;

const communitySchema = new Schema({
  schema_version: Number,
  name: String,
  excerpt: String,
  description: String,
  namespace: String,
  picture: String,
  cover: String,
  member_list: [{
    member: { type: Schema.Types.ObjectId, ref: "Member" }
  }],
  created_at: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User"},
  stats: {
    total_members: Number,
    total_active_members: Number,
    total_suspended_members: Number
  }
});

module.exports = mongoose.model("Community", communitySchema);
