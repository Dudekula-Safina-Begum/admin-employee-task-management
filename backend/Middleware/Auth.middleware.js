const jwt = require('jsonwebtoken');
const AdminModel=require('../modules/admin.module')
const employeeModel =require('../modules/employee.module')
const blackListTokenModel=require('../modules/blackListTokenModel')

module.exports.authenticateAdmin = async(req, res, next) => {
    const token=req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    if(!token){
        return res.status(401).json({message:"unauthorized"});
    }
    // const isBlackListed=await blackListTokenModel.findOne({token:token});
    // if(isBlackListed){
    //     return res.status(401).json({message:"unauthorized user"})
    // }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const admin=await AdminModel.findById(decoded._id)
        // console.log(admin)
        req.user=admin;
        return next()

    }catch(err){
        return res.status(401).json({message:"unauthorization user"})

    }
};

module.exports.authenticateEmployee=async(req,res,next)=>{

    const token=req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    if(!token){
        return res.status(401).json({message:"unauthorized"});
    }
    // const isBlackListed=await blackListTokenModel.findOne({token:token});
    // if(isBlackListed){
    //     return res.status(401).json({message:"unauthorized user"})
    // }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const employee=await employeeModel.findById(decoded._id)
        req.user=employee;
        return next()

    }catch(err){
        return res.status(401).json({message:"unauthorization user"})

    }

    }

