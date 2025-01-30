const adminmodel=require('../modules/admin.module');
module.exports.creatAdmin=async ({
    fullname,email,password
})=>{
    if(!fullname || !email || !password ){
        console.log("eroor")
        throw new Error('All fields are required');
    }
    const admin=adminmodel.create({
        fullname,
        email,password
    })
    return admin;
}