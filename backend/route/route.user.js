const express=require("express")
const {userProfile}=require("../models/model.user")
const {dataProfile}=require("../models/model.todos")
var jwt = require('jsonwebtoken');
const { json } = require("body-parser");
const bcrypt = require('bcrypt');
const app=express()
app.use(express.json())


let userrouter=express.Router()

userrouter.get("/",async (req,res)=>{
    
    let data=await userProfile.find()
    res.send(data)
})

userrouter.post("/signin",async(req,res)=>{

    const{Email,Password,Name}=req.body

    bcrypt.hash(Password, 5, async function(err, hash) {
        // Store hash in your password DB.

        let data=new userProfile({Email,Name,Password:hash})
    console.log(req.body)
    data.save()
    res.send({"err":"sign in sucessful"})

    })

    
})
userrouter.post("/login",async(req,res)=>{
     const {Email,Password}=req.body

   
     let data=await userProfile.findOne({Email})


     if(data)
     {
     bcrypt.compare(Password, data.Password, function(err, result) {
        // result == true

      
          if(result)
          {
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                authorId: data._id,
                authorName:data.Name
              }, 'secret');
       
      
    
              res.send({token})

          }
          else{
            res.send("enter correct id and password")
          }



    })
}
else{
    res.send("enter correct id and password")
}
     

})


userrouter.get("/list",async(req,res)=>{

 
  const{authorId,authorName}=req.body
  console.log(authorId)

        let data=await dataProfile.find({authorId,authorName})
      

    res.send(data)
        

})

userrouter.post("/add",async(req,res)=>{
    let bank=req.body

    try{
        let data= new dataProfile(bank)
        console.log(data)
        await data.save()
 

    res.send(data)

    }
    catch(err)
    {
        res.send("some error occur")
    }
       
        

})
userrouter.patch("/:id",async(req,res)=>{
    const{authorId,authorName}=req.body
    console.log(authorId,authorName)

     try{
        let data=await dataProfile.findByIdAndUpdate({_id:req.params.id,authorId,authorName},req.body)
         
        console.log(data)

    res.send(data)

     }
     catch(err)
     {
        res.send("something went wrong")
     }
   
       
        

})
userrouter.delete("/:id",async(req,res)=>{

    const{authorId,authorName}=req.body
    console.log(authorId,authorName)

     try{
        let data=await dataProfile.findByIdAndDelete({_id:req.params.id,authorId,authorName},req.body)
         
        console.log(data)

    res.send(data)

     }
     catch(err)
     {
        res.send("something went wrong")
     }
   
})





module.exports={userrouter}