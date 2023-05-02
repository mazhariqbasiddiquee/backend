var jwt = require('jsonwebtoken')

const varify=(req,res,next)=>{
    let token=req.headers.authorization

    jwt.verify(token, 'secret', function(err, decoded) {


        // bar
       if(decoded)
       {
        req.body.userId=decoded.userId
        req.body.user=decoded.user
        console.log(decoded)

        next()
       }
       else{
        res.send({"err":"verification fail"})
       }
    
      })

}


module.exports={varify}
