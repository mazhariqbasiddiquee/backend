const mongoose=require("mongoose")

const schema=mongoose.Schema({
    Name:{type:String,require:true},
    Password:{type:String,require:true},
    Email:{type:String,require:true}
    
})

let userProfile=mongoose.model("user",schema)

module.exports={userProfile}