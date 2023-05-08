import OrderModel from '../models/order.js';
import User from '../models/user.js';

export async function getAllOrders(req, res) {
  try {
    OrderModel.find({}).then(function (orders) {
      res.status(201).send(orders);
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getOrderbyId(req, res) {
  try {
    const { _orderid } = req.params;
    console.log(_orderid);
    OrderModel.find({ _orderid }).then(function (detail) {
      res.status(201).send(detail);
    });
  } catch (error) {
    console.log(error);
  }
}
