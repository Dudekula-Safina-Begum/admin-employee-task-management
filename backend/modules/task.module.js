const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  assignedToName:{
    type:String,
    require:true

  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId, // Reference to an Employee
    ref: 'Employee',
    // required: true,
  },
});

// Export Task Model
module.exports = mongoose.model('Task', TaskSchema);
