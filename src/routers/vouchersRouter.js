import express from "express";
const router = express.Router();
import VouchersController from "../controller/vouchersController.js";

router
  .get("/vouchers", VouchersController.getAllVouchers)
  .get("/vouchers/:id", VouchersController.getVouchersById)
  .post("/vouchers", VouchersController.addVouchers)
  .put("/vouchers/:id", VouchersController.updateVouchers)
  .delete("/vouchers/:id", VouchersController.deleteVouchers);

export default router;
