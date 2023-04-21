import express from 'express'
const router=express.Router()
import * as hoadonController from '../controller/hoadonController.js'

router
    .get("/hoadon", hoadonController.getAllHoaDon)
    .get("/hoadon/:id", hoadonController.getHoaDonById)
    .add("/hoadon", hoadonController.addHoaDon)
    .put("hoadon/:id", hoadonController.updateHoadon)
    .delete("hoadon/:id", hoadonController.deleteHoaDon)

export default router