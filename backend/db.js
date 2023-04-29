const mongoose=require("mongoose")

let connection =mongoose.connect("mongodb+srv://mazhariqbal:iqbal@cluster0.hrvyke3.mongodb.net/todos?retryWrites=true&w=majority")

module.exports={connection}