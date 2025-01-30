const mongoose = require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const AdminSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength:[3,' name should me min 3 charcters']
  
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength:[6,'password should me minmun 3 charcters']
  
  },
});

// Method to hash password
AdminSchema.statics.hashpassword = async function (password) {
    return bcrypt.hash(password,10);
};

AdminSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
};

// Method to generate auth token
AdminSchema.methods.generateAuthToken = function () {
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET)
  return token;
};

module.exports = mongoose.model('Admin', AdminSchema);


