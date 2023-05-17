import OrderModel from '../models/order.js';

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
export async function cancelOrderById(req, res) {
  try {
    const { tinhtrang } = req.body;

    const _orderid = req.body._orderid;
    OrderModel.updateOne({ _id: _orderid }, { tinhtrang: tinhtrang })
      .then(function (data) {
        res.status(201).send(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

export async function deliveredOrderById(req, res) {
  try {
    const { tinhtrang } = req.body;

    const _orderid = req.body._orderid;
    OrderModel.updateOne({ _id: _orderid }, { tinhtrang: tinhtrang })
      .then(function (data) {
        res.status(201).send(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}
// UserModel.updateOne({ _id: _id }, body)
