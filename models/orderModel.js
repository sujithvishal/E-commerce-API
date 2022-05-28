import mongoose from 'mongoose'

const orderSchema=new mongoose.Schema({
    products:[{product:{type:mongoose.Types.ObjectId,ref:'Product'},quantity:Number}],
    totalAmount:{
        type:Number,
        required:true,
    },
    user:{type:mongoose.Types.ObjectId,ref:'User'},
    orderedAt:{
        type:Date,
        default:Date.now()
    }
})

const orderModel = mongoose.model('Order',orderSchema)
export default orderModel