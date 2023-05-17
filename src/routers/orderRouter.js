import express from 'express';
const router = express.Router();
import * as orderController from '../controller/histopryOrderController.js';

router.route('/orders/:_id').get(orderController.getAllOrders);
router.route('/orderdetail/:_orderid').get(orderController.getOrderbyId);

router.route('/cancelorder').put(orderController.cancelOrderById);

router.route('/deliveredorder').put(orderController.deliveredOrderById);
export default router;
