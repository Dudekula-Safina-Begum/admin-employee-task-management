const TaskModle=require('../modules/task.module')



module.exports.registerAdmin = async (req, res) => {
  
    // Validate request body
    // console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('error')
      return res.status(400).json({ errors: errors.array() });
    }

    const { title,description,date,assignedTo } = req.body;

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