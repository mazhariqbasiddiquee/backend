const express=require("express")
const app=express()
const {user} = require("../model/model.content")
app.use(express.json())

let contentRouter=express.Router()

contentRouter.get("/",async(req,res)=>{
    let {userId}=req.body
    try
    {
        let data=await user.find({userId})
        if(data.length!=0)
        {
            res.status(200).send([{"process":"succesfull"},{data}])
        }
        else{
            res.status(300).send({"err":"no data found"})   
        }
        
    }
    catch{
        res.status(300).send({"process":"unsuccesfull"})  
    }

    
   
})

contentRouter.post("/add",async(req,res)=>{

    try{
        let data =await new user(req.body)
    data.save()
   
    res.status(200).send([{"process":"succesfull"},{data}])

    }
    catch{
        res.status(300).send({"process":"unsuccesfull"})  
    }
    
})

contentRouter.patch("/update/:id",async(req,res)=>{
    let id=req.params
    id=JSON.stringify(id)
    let {userId}=req.body
    
      console.log(id)

       try{
        let data=await user.findByIdAndUpdate({"_id":id})
        

        console.log(data)
        res.status(200).send([{"process":"succesfull"}])

       }
       catch(err){
        console.log(err)
        res.status(300).send({"process":"unsuccesfull during working"}) 
       }
      
            
       
    
})

contentRouter.delete("/delete/:id",async(req,res)=>{
    let id=req.params
    let {userId}=req.body
    
      console.log(id)

       try{
        let data=await user.findByIdAndDelete({userId,id},req.body)
        

        console.log(data)
        res.status(200).send([{"process":"succesfull"}])

       }
       catch{
        res.status(300).send({"process":"unsuccesfull during working"}) 
       }
      
            
       
    
})



module.exports={contentRouter}