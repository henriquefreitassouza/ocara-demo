const mongoose = require("mongoose");
const { Validate } = require("../../utils");

const { Schema } = mongoose;

const accountSchema = new Schema({
  schema_version: Number,
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'O endereço de e-mail é obrigatório',
    validate: [Validate.validateEmail, 'Digite um endereço de e-mail válido']
  },
  password: {
    type: String,
    min: [6, 'A senha deve conter no mínimo 6 caracteres']
  },
  created_at: { type: Date, default: Date.now },
  last_active_at: { type: Date, default: Date.now },
  verified: Boolean,
  active: Boolean,
  suspended: Boolean,
  stats: {
    total_accesses: Number,
  }
});

module.exports = mongoose.model("Account", accountSchema);
