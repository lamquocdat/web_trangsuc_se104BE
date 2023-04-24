import express from "express";
const router = express.Router();
import ProductController from "../controller/productController.js";

router
  .get("/product", ProductController.getAllProduct)
  .get("/product/:id", ProductController.getProductById)
  .post("/product", ProductController.addProduct)
  .put("/product/:id", ProductController.updateProduct)
  .delete("/product/:id", ProductController.deleteProduct);

export default router;
