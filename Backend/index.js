const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const userRoutes=require("./routes/userRoutes")

const app=express()
const dotenv=require("dotenv")

dotenv.config();

// middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes)

mongoose.connect(process.env.MONGODB_URL,{
     useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("mongodb is connected")
});

const server=app.listen(process.env.PORT,()=>{
    console.log(`lisenting to the ${process.env.PORT}`)
})