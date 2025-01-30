const express = require("express")
const employeeController = require('../controller/employee.controller')
const { body } = require("express-validator");
const authMiddleWare=require('../Middleware/Auth.middleware')

const route = express.Router()


route.post('/register', [body("email").isEmail().withMessage("Invalid email format"),
body("fullname").isLength({ min: 3 }).withMessage("Full name must be at least 3 characters long"),
body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")], employeeController.registerEmp
)

route.post('/login',[ body("email").isEmail().withMessage("Invalid email format"),
    // body("fullname").isLength({ min: 3 }).withMessage("Full name must be at least 3 characters long"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),],employeeController.loginAEmp
)

route.get('/profile',authMiddleWare.authenticateEmployee,employeeController.getEmployeeProfile) 

route.get('/gettask',authMiddleWare.authenticateEmployee,employeeController.gettask)


module.exports = route