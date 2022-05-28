import jwt from 'jsonwebtoken'

const checkAuth=(req,res,next)=>{
   
    try{
        const token =req.headers.authorization.split(' ')[1];
        jwt.verify(token,process.env.secretKey,(err,decoded)=>{
            if(err){
                res.status(403).json({error:{message:"invalid token"}})
            }else{
                req.locals=decoded.user
                next()
            }
        })

    }catch(err){
        res.status(404).json({error:{message:"token not available"}})

    }
   
}
export default checkAuth