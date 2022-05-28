import express from "express"
import dotenv from 'dotenv'
import mongoose from "mongoose";
import bodyParser from 'body-parser'
import cors from "cors"
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import checkAuth from "./middleware/checkAuth.js";

dotenv.config();
const app=express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/uploads',express.static('./uploads'))

mongoose.connect(process.env.mongo_url, {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
  app.listen(8000,()=>console.log('server up'))
})

app.use('/user',userRoutes)
app.use('/products',checkAuth,productRoutes)
app.use('/orders',checkAuth,orderRoutes)

app.use("/**",(req,res)=>{
  res.status(400).json({error:{
    message:"not found"
  }})

})