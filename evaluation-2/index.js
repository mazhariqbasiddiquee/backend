const express=require("express")
const app=express()
const mongoose=require("mongoose")
const {userRouter}=require("./route/route.user")
const { userProfile } = require("./model/model.user")
app.use(express.json())

const {varify}=require("./middleware/token")
const {contentRouter}=require("./route/route.content")


app.use("/user",userRouter)

app.use(varify)
app.use("/content",contentRouter)

app.get("/check",(req,res)=>{
    res.send("welcome sir")
})


app.listen(4500,async(err)=>{



    try{
        await mongoose.connect("mongodb+srv://mazhariqbal:iqbal@cluster0.hrvyke3.mongodb.net/evaluation?retryWrites=true&w=majority")  
       console.log("connected to server")
    }
    catch(err)
    {
        console.log(err)
    }
    

})
