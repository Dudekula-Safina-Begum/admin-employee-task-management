const express = require("express");
const adminController = require("../controller/admin.controller");
const { body } = require("express-validator");
const authMiddleWare=require('../Middleware/Auth.middleware')

const router = express.Router();

// Admin registration route
router.post(
  "/register",
  [
    // Validation rules
    body("email").isEmail().withMessage("Invalid email format"),
    body("fullname").isLength({ min: 3 }).withMessage("Full name must be at least 3 characters long"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  adminController.registerAdmin // Controller to handle registration
);

router.post('/login', [body("email").isEmail().withMessage("Invalid email format"),
// body("fullname").isLength({ min: 3 }).withMessage("Full name must be at least 3 characters long"),
body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),], adminController.loginAdmin
)

router.get('/profile',authMiddleWare.authenticateAdmin,adminController.getAdminProfile)
router.post('/taskcreat',authMiddleWare.authenticateAdmin,adminController.createTask)
router.get('/gettask',authMiddleWare.authenticateAdmin,adminController.gettask)


module.exports = router;
