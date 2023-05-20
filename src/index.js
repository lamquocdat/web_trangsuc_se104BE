import express from 'express';
import dotenv from 'dotenv';
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
import serviceTypeRouter from "../src/routers/serviceTypeRouter.js"

//cấu hình để upload ảnh lên firebase
import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyDt2XpoTVsNwqaJ1Rk0Z5TvtYWQukOjU84',
  authDomain: 'dialuxury.firebaseapp.com',
  projectId: 'dialuxury',
  storageBucket: 'dialuxury.appspot.com',
  messagingSenderId: '815826751425',
  appId: '1:815826751425:web:26f62050c8de87dabea940',
  measurementId: 'G-197DEF7CVB',
};

initializeApp(firebaseConfig);

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack

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
app.use(loginRouter);
app.use(serviceTypeRouter);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

connect()
  .then(function () {
    app.listen(port, () => {
      console.log('Server is up on PORT ' + port);
    });
  })
  .catch(function (error) {
    console.log(error);
  });
