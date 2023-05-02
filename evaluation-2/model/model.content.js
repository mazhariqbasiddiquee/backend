const mongoose=require("mongoose")


let schema=mongoose.Schema({
   title:{type:String,require:true},
   body:{type:String,require:true},
   user:{type:String,require:true},
   userId:{type:String,require:true},
   category:{type:String,require:true},
   live:{type:Boolean}
})


let user=mongoose.model("content",schema)

module.exports={user}