import express from "express"
import dotenv from 'dotenv'
import mongoose from "mongoose";
import userRoutes from './routes/userRoutes.js'

dotenv.config();
const app=express()

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/mydb1", {
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