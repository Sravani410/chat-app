const mongoose= require("mongoose")

const registerSchema= new mongoose.Schema({
      name:{
        type:String,
        required:true,
        unique:true,
        min:5,
        max:10
      },
      email:{
       type: String,
       required:true,
       unique:true
      },
      password:{
        type:Number,
        required:true,
        unique:true
        },
      confirmpassword:{
        type:Number,
        required:true,
        unique:true,
     }
})

module.exports={registerSchema}
