import mongoose from "mongoose";
const hoadonSchema = new mongoose.Schema({
    mahd: {
        type: String,
        default: "HD01",
        trim: true
    },
    makh: {
        type: String,  
        require: true,
        trim: true
    },
    manv: {
        type: String,
        require: true,
        trim: true
    },
    ngayxuathd: {
        type: String,
        require: true,
        trim: true
    },
    tinhtrang: {
        type: String,
        default: "Đã thanh toán"
    },
    trigia: {
        type: Number, 
        require: true,
    },
    diachigiaohang: {
        type: String,
        require: true
    }
}, {require: true})
const HoaDon = mongoose.model("hoadon", hoadonSchema)
export default HoaDon

