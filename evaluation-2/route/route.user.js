const express=require("express")
const app=express()
const {userProfile}=require("../model/model.user")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')

const userRouter=express.Router()



userRouter.get("",async(req,res)=>{
    let data=await userProfile.find()
    res.send(data)
})

userRouter.post("/signin",async(req,res)=>{
    let {name,email,password,age,city}=req.body

    let data=await userProfile.findOne({email})
    console.log(password)

      console.log(data)
    if(data==null)
    {

    try{
        bcrypt.hash(password, 5, function(err, hash) {
            // Store hash in your password DB.
            if(hash)
            {

                let data=new userProfile({name,email,age,city,password:hash})
        data.save()
        res.status(200).send({"process":"succesfull"})

            }
            else
            {
                res.status(300).send({"hashing":"fail"})
            }

        });
        
    }
    catch{
        res.status(300).send({"process":"unsuccesfull"})
    }
}
else{
    res.send({"err":"already register"})
}
   
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    let data=await userProfile.findOne({email})
    if(data)
    {
    bcrypt.compare(password, data.password, function(err, result) {

        if(result)
        {
            let token=jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                userId: data._id,
                user:data.name
              }, 'secret');
            res.status(200).send([{"process":"succesfull"},{token}])
        }
        else{
            res.status(300).send({"err":"enter correct password"}) 
        }
        // result == true
    });
}
else{
    res.status(300).send({"err":"no user found"})
}


})

module.exports={userRouter}