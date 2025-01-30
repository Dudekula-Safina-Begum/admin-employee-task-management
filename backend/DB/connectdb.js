const mongoose=require('mongoose')
 
function connect(){
   mongoose.connect(process.env.DB_connect).then(()=>{
    console.log("connected to DB")
})
}

module.exports=connect