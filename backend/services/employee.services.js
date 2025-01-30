const employeeModel=require('../modules//employee.module');
module.exports.creatEmployee=async ({
    fullname,email,password
})=>{
    if(!fullname || !email || !password){
        console.log("eroor")
        throw new Error('All fields are required');
    }
    const employee=employeeModel.create({
        fullname,
        email,password
    })
    return employee;
}