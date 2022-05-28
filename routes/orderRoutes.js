import express from 'express'
import Order from '../models/orderModel.js'
const router= express.Router()


router.post('/',(req,res)=>{
    const order= new Order({
        products:req.body.products,
        user:req.body.user,
        totalAmount:req.body.totalAmount
    })

    order.save().then(doc=>{
        res.status(200).json({success:true,message:"order placed successfully"})
    }).catch(err=>{
        res.status(err.status||500).json({error:{message:err.message}})
    })

    
})

router.get('/',(req,res)=>{
    Order.find().populate('products.product')
    .populate('user')
    .then(doc=>{
        res.status(200).json({
            count:doc.length,
            orders:doc
        })
    }).catch(err=>{
        res.status(err.status||500).json({error:{message:err.message}})

    })
})

router.get("/:id",(req,res)=>{
    Order.findById(req.params.id).populate('products.product')
    .populate('user')
    .then(doc=>{
        if(!doc||doc.length<1){
            res.status(401).json({error:{message:"order not found"}})
        }else{
            res.status(200).json({
                order:doc
            })
        }
       
    }).catch(err=>{
        res.status(err.status||500).json({error:{message:err.message}})

    })

})


router.delete("/:id",(req,res)=>{
    Order.findByIdAndDelete(req.params.id)
    .then(doc=>{
        res.status(200).json({success:true,message:"order deleted successfully"})
    }).catch(err=>{
        res.status(err.status||500).json({error:{message:err.message}})

    })
  
})


export default router