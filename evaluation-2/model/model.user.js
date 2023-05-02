const mongoose=require("mongoose")


let schema=mongoose.Schema({
   name:{type:String,require:true},
   email:{type:String,require:true},
   password:{type:String,require:true},
   city:{type:String,require:true},
   age:{type:Number,require:true}
})


let userProfile=mongoose.model("user",schema)

module.exports={userProfile}