import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "./database/mongoose.js";
import cors from "cors";
import userRouter from "../src/routers/userRouter.js";
import productRouter from "../src/routers/productRouter.js";
import orderRouter from "../src/routers/orderRouter.js";
import cartRouter from "../src/routers/cartRouter.js";
import router from "../src/routers/warehouseRouter.js";
import vouchersRouter from "../src/routers/vouchersRouter.js";
import serviceRouter from "../src/routers/serviceRouter.js";
import warehouseRouter from "../src/routers/warehouseRouter.js";
import path from 'path';
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
//Router:
app.use(productRouter);
app.use(userRouter);
app.use(orderRouter);
app.use(cartRouter);
app.use(router);
app.use(vouchersRouter);
app.use(warehouseRouter);
app.use(serviceRouter);
//cấu hình để lưu ảnh vào thư mục confirms
const currentFilePath = new URL(import.meta.url).pathname;
const currentDirPath = path.dirname(currentFilePath);
app.use('/confirms', express.static(path.join(currentDirPath, 'src','confirms')));
console.log(currentDirPath)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// API endpoint để lấy hình ảnh với tên file là "filename"
app.get('/confirms/:filename', function(req, res){
  const imagePath = path.join(currentDirPath,'confirms', req.params.filename);
  res.sendFile(imagePath.slice(1));
});
app.listen(port, () => {
  console.log("Server is up on PORT " + port);
});
