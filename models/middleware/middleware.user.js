var jwt = require('jsonwebtoken')


let auth=(req,res,next)=>{
    const token=req.headers.authorization
    if(token)
    {
        jwt.verify(token,"secret", async(err,decoded )=>{
            if(err)
            {
                
            res.send("Invalid Token")
            console.log(err)
            } 
            else 
            {
                req.body.authorId=decoded.authorId
                req.body.authorName=decoded.authorName
            console.log(decoded.authorId)
            console.log(decoded.authorName)
               next()
            }
            })

    }
    else{
        res.send("enter correct token")
    }

}


module.exports={auth}