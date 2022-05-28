import mongoose from "mongoose";

const productSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    productImage:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum:['footwears','dress','groceries','sports','electronics','all'],
        default:'all'
    }
},{timestamps:true})

const productModel =mongoose.model("Product",productSchema);

export default productModel