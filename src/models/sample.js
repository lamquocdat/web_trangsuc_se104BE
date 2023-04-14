import mongoose from 'mongoose'
import validator from 'validator'
const sampleSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
    }
        
},{timestamps: true})
const Sample=mongoose.model('Sample',sampleSchema)
export default Sample 