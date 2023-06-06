import express from "express";
const router = express.Router();
import ProductController from "../controller/productController.js";

router
  .get("/product", ProductController.getAllProduct)
  .get("/product/search", ProductController.searchProduct)
  .get("/product/:id", ProductController.getProductById)
  .get("/product/category/:category", ProductController.getProductsByCategory)
  .get("/sortedProduct", ProductController.sortAndgetAllProduct)
  .get(
    "/soldNumbersOfProducts",
    ProductController.sortBySoldNumberAndGetAllProduct
  )
  .post("/product", ProductController.addProduct)
  .put("/product/:id", ProductController.updateProduct)
  .delete("/product/:id", ProductController.deleteProduct);

export default router;
