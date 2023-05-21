import OrderModel from '../models/order.js';
import confirmScheduleMail from './mailer.js';

export async function getAllOrders(req, res) {
  try {
    OrderModel.find({ userId: req.params._id })
      .then(function (orders) {
        res.status(201).send(orders);
      })
      .catch(function (error) {
        console.log(errors);
        res.status(401).send(error);
      });
  } catch (error) {
    console.log(error);
    res.status(405).send(error);
  }
}
export async function getAllOrdersAllUser(req, res) {
  try {
    const orders = await OrderModel.find({});

    console.log(orders);
    res.status(202).send(orders);
  } catch (error) {
    console.log(error);
    res.status(405).send(error);
  }
}

export async function getOrderbyId(req, res) {
  try {
    const { _orderid } = req.params;
    console.log(_orderid);
    OrderModel.find({ _id: _orderid }).then(function (detail) {
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
export async function confirmOrderbyId(req, res) {
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

export async function scheduleMail(req, res) {
  const { date, email } = req.body; //get parameter

  if (!date) return res.status(501).send({ error: 'invalid date' });

  try {
    confirmScheduleMail(email, date);

    return res.status(201).send('ok');
  } catch (error) {
    return res.status(500).send({ error });
  }
}
