const adminModel = require('../modules/admin.module'); // Fixed naming for consistency
const employeeModel=require('../modules/employee.module')
const adminService = require('../services/admin.services');
const taskService=require('../services/task.services')
const taskModel=require('../modules/task.module')
const { validationResult, body } = require('express-validator');

module.exports.registerAdmin = async (req, res) => {
  
    // Validate request body
    // console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('error')
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    // Check if admin already exists
    const isAdminAlreadyExist = await adminModel.findOne({ email });
    if (isAdminAlreadyExist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashpassword = await adminModel.hashpassword(password);

    // Create admin
    const admin = await adminService.creatAdmin({
      fullname,
      email,
      password: hashpassword,
    });

    // Generate JWT token
    const token = admin.generateAuthToken();

    res.status(201).json({ token, user: admin });
  };

module.exports.loginAdmin=async(req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('error')
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const Admin = await adminModel.findOne({ email });

    if(!Admin){
      return res.status(401).json({message:'invalid email or password'})
    }

    const isMatch=await Admin.comparePassword(password);

     if(!isMatch){
      return res.status(401).json({message:"invalid email or password"});
     }
     const token=Admin.generateAuthToken();
     res.cookie('token',token);
     res.status(200).json({token,Admin})
   




}



module.exports.getAdminProfile=async(req,res)=>{
  console.log('profile')
  console.log(req.user)
  res.status(200).json(req.user)
}

module.exports.createTask=async(req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('error')
      return res.status(400).json({ errors: errors.array() });
    }

    const { title,description,date,assignedToName} = req.body;

    const employee = await employeeModel.findOne({ fullname: assignedToName });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Check if admin already exists
    // const isAdminAlreadyExist = await adminModel.findOne({ email });
    // if (isAdminAlreadyExist) {
    //   return res.status(400).json({ message: 'User already exists' });
    // }

    // Hash the password
    // const hashpassword = await adminModel.hashpassword(password);

    // Create admin
    const Title = await taskService.creatTask({
      title,description,date,assignedToName,assignedTo:employee._id
    });

    // Generate JWT token
    // const token = admin.generateAuthToken();

    // res.status(201).json({ token, user: admin });
    res.status(201).json({user:Title})

}

module.exports.gettask=async(req,res)=>{
  
  // const employees=req.user
  // console.log(employees)

  const employee = await taskModel.find();
  // console.log(employee)
  res.status(200).json({employee})
}


