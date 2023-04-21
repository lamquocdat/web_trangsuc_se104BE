import express from "express";
const router = express.Router();
import * as cartController from "../controller/cartController.js";

router
    .get("/cart/:id", cartController.getCartByMaKH)
    .post("/cart", cartController.addSpToCart)
    .put("/cart/makh=:makh", cartController.updateCart)
    .delete("/cart/productId=:productId", cartController.deleteSp)
    .delete("/cart/:id", cartController.deleteGH);

export default router;
