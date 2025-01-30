const TaskModle=require('../modules/task.module')


module.exports.creatTask=async ({
    title,description,date,assignedToName,assignedTo
})=>{
    if(!title || !description|| !date || !assignedTo || !assignedToName ){
        console.log("eroor")
        throw new Error('All fields are required');
    }
    const task=TaskModle.create({
        title,description,date,assignedTo,assignedToName
    })
    return task;
}