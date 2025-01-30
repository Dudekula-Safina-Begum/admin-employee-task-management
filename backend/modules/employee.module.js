const mongoose = require('mongoose');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const EmployeeSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength:[3,'first name should me minmun 3 charcters']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength:[3,'first name should me minmun 3 charcters']
  },
  password: {
    type: String,
    required: true,
    minlength:[3,'first name should me minmun 3 charcters']
  },
});

EmployeeSchema.statics.hashpassword = async function (password) {
  return bcrypt.hash(password,10);
};

EmployeeSchema.methods.comparePassword=async function(password){
  return await bcrypt.compare(password,this.password);
};

// Method to generate auth token
EmployeeSchema.methods.generateAuthToken = function () {
  const token=jwt.sign({_id:this._id},process.env.JWT_SECRET)
return token;
};

// Export Employee Model
module.exports = mongoose.model('Employee', EmployeeSchema);
