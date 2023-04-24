import express from 'express'
const router=express.Router()
import * as warehouseController from '../controller/warehouseController.js'

router
    .get("/warehouse", warehouseController.getAllTonKho)
    .get("/warehouse/:id", warehouseController.getTonKhoById)
 

export default router