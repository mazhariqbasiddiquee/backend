const mongoose=require("mongoose")

const schema=mongoose.Schema({
    
    native:{type:String,require:true},
    notes:{type:String,require:true},
    authorId:{type:String,require:true},
    authorName:{type:String,require:true}
    
})

let dataProfile=mongoose.model("Newdata",schema)

module.exports={dataProfile}