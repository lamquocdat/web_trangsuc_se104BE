import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
try{

    mongoose.connect(process.env.MONGODB_URL)
}
catch(e){
    console.log(e);
}
mongoose.set('strictQuery', true);
