const express=require("express")
const app=express()
const mongoose=require("mongoose")
const cors=require("cors")
const {connection}=require("./db")
const {auth}=require("./models/middleware/middleware.user")
const {userrouter}=require("./route/route.user")
app.use(express.json())
app.use(cors())

app.use("/user",userrouter)

app.use(auth)
app.use("/note",userrouter)

app.listen(4500,async ()=>{
    
        await connection
        console.log("connected to db")
    
   
})







