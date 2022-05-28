import express from "express";
import Product from "../models/productModel.js"
import multer from 'multer'
import path from 'path'
import { rmdirSync } from "fs";

const router=express.Router()
const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
      cb(null,new Date().toISOString().replace(/:/g, '-')+file.originalname)
    }
  })
  const upload=multer({
    storage:storage,
    limits:{
      fileSize:1024*1024*1
    }
  })
  
  router.post('/',upload.single('productImage'),async (req,res)=>{
  const product =new Product({
      name:req.body.name,
      description:req.body.description,
      price:req.body.price,
      productImage:req.file.path,
      category:req.body.category
  })

  product.save().then(result=>{
      res.status(200).json({success:true,message:"product added successfully",createdPRoduct:result})

  }).catch(err=>{
      res.status(err.status||500).json({error:{message:err.message}})
  })
  })

  router.get('/',(req,res)=>{
      const category = req.query.category;
      if(category){
        Product.find({}).where('category').equals(category).then(doc=>{
            res.status(200).json({count:doc.length,products:doc})
        }).catch(err=>{
          res.status(err.status||500).json({error:{message:err.message}})
      })

      }else{
        Product.find({}).limit(20).then(doc=>{
            res.status(200).json({count:doc.length,products:doc})
        }).catch(err=>{
          res.status(err.status||500).json({error:{message:err.message}})
      })

      }
      
  })


  router.get("/:id",(req,res)=>{
      Product.findById(req.params.id).then(doc=>{
          if(doc.length<1)
            res.status(404).json({error:{message:"products not found"}})
          else
            res.status(200).json({product:doc})
      }).catch(err=>{
        res.status(err.status||500).json({error:{message:err.message}})

      })

  })


  router.put('/',(req,res)=>{

  })

  router.delete("/:id")
  

  

export default router
