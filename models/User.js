const mongoose = require('mongoose');
// ES 2015 JS destructring, the following lines are the same
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema ({
  googleId: String,
  displayName: String
});

mongoose.model('users', userSchema);
