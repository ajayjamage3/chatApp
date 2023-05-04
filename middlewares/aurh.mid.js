const jwt = require("jsonwebtoken")
require("dotenv").config()

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        const decode = jwt.verify(token,process.env.key)
        if(decode){
            const user =  decode.user
            req.body.user = user
            next()
        }else{
            res.send({"msg":"please login again"})
        }
    }else{
        res.send({"msg":"please login "})
    }
}

module.exports = {
    authenticate
}