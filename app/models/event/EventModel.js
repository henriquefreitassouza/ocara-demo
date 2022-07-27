const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
  schema_version: Number,
  title: String,
  date: Date,
  online: Boolean,
  cover: String,
  place: {
    address: String,
    number: String,
    reference: String,
    neighborhood: String,
    city: String,
    state: String,
    country: String,
    postal_code: String
  },
  member: { type: Schema.Types.ObjectId, ref: "Member" },
  community: String,
  namespace: String,
  description: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  rsvp_list: [{
    member: { type: Schema.Types.ObjectId, ref: "Member" },
    status: String,
    confirmed: Boolean
  }],
  stats: {
    total_rsvp: Number,
    total_participants: Number
  }
});

module.exports = mongoose.model("Event", eventSchema);
