import express from 'express'
const router=express.Router()
import * as orderController from '../controller/orderController.js'
import multer from 'multer';

//Middleware để lưu hình ảnh từ trường hinhanh vào trong thư mục confirms
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/confirms/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extension = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
    }
});

const upload = multer({ storage: storage });

router
    .get("/order", orderController.getAllOrder)
    .get("/order/:id", orderController.getOrderById)
    .get("/order/kh/:ten", orderController.getOrderByKH)
    .get("/order/tinhtrang/:tinhtrang", orderController.getOrderByStatus)
    .get("/order/hd/:mahd", orderController.getOrderByMahd)
    .post("/order", orderController.addOrder)
    .put("/order/:id", upload.single('hinhanh'), orderController.updateOrder)
    .delete("/order/:id", orderController.deleteOrder)

export default router