const mongooes = require("mongoose");

const UserSchema = new mongooes.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongooes.model("UserSchema", UserSchema);
