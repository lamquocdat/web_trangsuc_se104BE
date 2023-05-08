import express from 'express';
const router = express.Router();
import * as orderController from '../controller/histopryOrderController.js';

router.route('/orders/:_id').get(orderController.getAllOrders);
router.route('/orderdetail/:_orderid').get(orderController.getOrderbyId);
export default router;
