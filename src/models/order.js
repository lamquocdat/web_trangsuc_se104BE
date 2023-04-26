import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    mahd: {
        type: String,
        default: "HD0",
        trim: true
    },
    makh: {
        type: String,  
        require: true,
        trim: true
    },
    // manv: {
    //     type: String,
    //     require: true,
    //     trim: true
    // },
    sanphams: [{
        sanpham: {
            type: String,
            require: true,
        },
        loaisp: {
            type: String,
            require: true,
        },
        sl: {
            type: Number,
            require: true,
            default: 1,
        },
        dvt: {
            type: String,
            require: true,
        },
        dongia: {
            type: Number,
            require: true,
        },
        thanhtien:{
            type: Number,
            require: true,
        }
    }],
    ngaylap: {
        type: String,
        require: true,
        trim: true
    },
    tinhtrang: {
        type: String,
        default: "Đã thanh toán"
    },
    diachigiaohang: {
        type: String,
        require: true
    }
}, {require: true})
const Order = mongoose.model("Orders", orderSchema)
export default Order

