//imported mongoose
const mongoose = require('mongoose')
//imported bcrypt
const bcrypt = require('bcrypt');

//created mongoose Schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
  name : {
    type: String,
    required: true
  },
  highScore : {
    type: Number,
    default: 0
  }
});

//Presave hook that hash pword when triggered 
UserSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

//method used fo validating user's password is correct when loggin in
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}
const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;