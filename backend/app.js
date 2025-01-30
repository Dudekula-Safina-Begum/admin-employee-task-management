const dotenv=require('dotenv')
dotenv.config()

const express=require('express')
const employee=require('./routes/employee.route')
const admin=require('./routes/admin.route')
const db=require('./DB/connectdb')
db()


const app=express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));


const cors=require('cors')
app.use(cors());

const cookieparser=require('cookie-parser')
app.use(cookieparser())


// app.get('/',(req,res)=>{
//     res.send("hello")
  
// })
app.use('/employee',employee)
app.use('/admin',admin)
app.listen(4000,()=>{console.log("server started")})
