const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  pokemonTeam: [
    {
      pokemonname: {
        type: String,
        required: true,
      },
      nickname: {
        type: String,
        required: true,
      },
      id: {
        type: Number,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    dafault: Date.now,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
