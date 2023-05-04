import express from 'express'
const router=express.Router()
import * as orderController from '../controller/orderController.js'

router
    .get("/order", orderController.getAllOrder)
    .get("/order/:id", orderController.getOrderById)
    .get("/order/kh/:ten", orderController.getOrderByKH)
    .get("/order/tinhtrang/:tinhtrang", orderController.getOrderByStatus)
    .get("/order/hd/:mahd", orderController.getOrderByMahd)
    .post("/order", orderController.addOrder)
    .put("/order/:id", orderController.updateOrder)
    .delete("/order/:id", orderController.deleteOrder)

export default router