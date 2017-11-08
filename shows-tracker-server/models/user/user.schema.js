const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { ShowSchema } = require('../show/show.schema');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  trackedShows: { type: [ShowSchema], default: [] }
});

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
};

module.exports = UserSchema;
