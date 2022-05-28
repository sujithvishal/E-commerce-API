import express from "express";
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const router = express.Router()

router.post('/register',async(req,res)=>{
    const user =new User({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,10)
    })
    User.find({email:user.email})
    .then(result=>{
      if(result.length>=1)
      res.status(401).json({error:{message:"email already exist"}})
      else{
          user.save().then(result=>{
              const token=jwt.sign({userId:result._id},process.env.secretKey,{expiresIn:'1h'})
              res.status(201).json({success:true,token:token})
          }).catch(err=>{
              res.status(err.status||500).json({error:{message:err.message}})
          })

      }
    })
    .catch(err=>res.status(err.status||500).json({error:{message:err.message}}))

})

router.post('/login',(req,res)=>{
    const email=req.body.email
    const password =req.body.password

    User.find({email:email}).then(result=>{
        if(result.length<1)
        res.status(400).json({error:{message:"inavlid email, register first"}})
        else{
            const isUser=bcrypt.compareSync(password,result[0].password)
            if(isUser){
                 const token=jwt.sign({userId:result[0]._id},process.env.secretKey,{expiresIn:'1h'})
                 res.status(201).json({success:true,token:token})
            }else{
                res.status(401).json({error:{
                    message:'invalid credentials'
                }})
            }
        }
      

    }).catch(err=>{
        res.status(err.status||500).json({error:{message:err.message}})
    })
})

router.delete("/:id",(req,res)=>{
    User.findByIdAndDelete(req.params.id).then(result=>{
        res.status(200).json({message:"user has been deleted"})
    }).catch(err=>{
        res.status(err.status||500).json({error:{message:err.message}})

    })
})

export default router;