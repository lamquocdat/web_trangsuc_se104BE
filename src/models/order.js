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
    hinhanh: {
        type: String,
        require: true,
        trim: true,
        default: ""
    },
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
        default: "done"
    },
    //processing: đang xử lý
    //shipping: đang giao
    //done: đã giao
    //cancle: đã hủy
    diachigiaohang: {
        type: String,
        require: true
    }
}, {require: true})
const Order = mongoose.model("Orders", orderSchema)
export default Order

