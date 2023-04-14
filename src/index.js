
import express from 'express'
import dotenv from 'dotenv';
dotenv.config();
import './database/mongoose.js';
import cors from 'cors' 
import sampleRouter from '../src/routers/sampleRouter.js';
const app = express() 
const port=process.env.PORT || 3000  
app.use(cors())  
app.use(express.json())
app.use(sampleRouter)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.listen(port, ()=>{
  console.log('Server is up on PORT '+port) 
})