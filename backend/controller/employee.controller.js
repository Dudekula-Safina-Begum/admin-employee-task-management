// const employeeModule = require('../modules/employee.module');
const employeeModel = require('../modules/employee.module'); // Fixed naming for consistency
const employeeService = require('../services/employee.services');
const taskModel=require('../modules/task.module')
const { validationResult, body } = require('express-validator');

module.exports.registerEmp = async (req, res) => {
  
    // Validate request body
    // console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('error')
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    // Check if admin already exists
    const isemployeeAlreadyExist = await employeeModel.findOne({ email });
    if (isemployeeAlreadyExist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashpassword = await employeeModel.hashpassword(password);

    // Create admin
    const employee = await employeeService.creatEmployee({
      fullname,
      email,
      password: hashpassword,
    });

    // Generate JWT token
    const token =  employee.generateAuthToken();

    res.status(201).json({ token, user:  employee });
  };

module.exports.loginAEmp=async(req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log('error')
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const employee = await employeeModel.findOne({ email });

    if(!employee){
      return res.status(401).json({message:'invalid email or password'})
    }

    const isMatch=await employee.comparePassword(password);

     if(!isMatch){
      return res.status(401).json({message:"invalid email or password"});
     }
     const token=employee.generateAuthToken();
     res.cookie('token',token);
     res.status(200).json({token,employee})
   
}

module.exports.getEmployeeProfile=(req,res)=>{

  res.status(200).json(req.user)

}


module.exports.gettask=async(req,res)=>{
  
  const fullname=req.user.fullname
  // console.log(fullname)

  const employee = await taskModel.find({assignedToName:fullname });
  // console.log(employee)
  res.status(200).json({employee})
}