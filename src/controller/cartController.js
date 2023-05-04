import cart from "../models/cart.js";
import product from "../models/product.js"

// Get Cart By Makh: truyền makh
export const getCartByMaKH = async (req, res) => {
    const userId = req.params.userId;

  try {
    const result = await cart.aggregate([
      { $match: { userId: userId } },
      {
        $lookup: {
          from: "products",
          localField: "sanphams.productid",
          foreignField: "productid",
          as: "sanphams",
        },
      },
      { $unwind: "$sanphams" },
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          tongtrigia: { $sum: { $multiply: ["$sanphams.price", "$sanphams.soluong"] } },
          sanphams: { $push: "$sanphams" },
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(404).send("Not found");
    }

    res.send(result[0]);
  } catch (e) {
    res.status(500).send(e);
  }
};

//Tạo một cart cho khách hàng mới, truyền vào mã khách hàng userId
export const addCart = async (req,res)=> {
    try {
        const giohang = new cart(req.body)
        await giohang.save()
        res.status(201).send(giohang)
    }
    catch(e) {
        res.status(500).send(e);
    }
}

// Add Product vào Order: truyền makh, masp, mausac, soluong
export const addSpToCart = async (req, res) => {
    const item = req.body;
    try {
        const kh = await cart.findOne({ makh: item.userId });
        const sp = await product.findOne({ productid: item.productid });
        if (!sp) {
            return res.status(404).send("Not found product");
        }

        const obj = {
            productid: sp.productid,
            soluong: item.soluong,
        };

        kh.sanphams.push(obj);
        kh.tongtrigia += sp.price * item.soluong; 
        await kh.save();
        res.status(201).send(kh);
        
    } catch (e) {
        res.status(400).send(e);
    }
};

// Delete sp from products: truyền userId, masp
export const deleteSp = async (req, res) => {
    const item = req.params;
    try {
        const order = await cart.findOne({ makh: item.userId });
        if (!order) {
            return res.status(404).send("Not found Customer");
        }

        order.sanphams = order.sanphams.filter((sp) => sp.productid !== item.productid);
        order.tongtrigia = order.sanphams.reduce((acc, currentValue) => {
            return acc + currentValue.price * currentValue.soluong;
        }, 0);

        order.save();
        res.send(order);
    } catch (e) {
        res.status(500).send(e);
    }
};

// Update so luong sp trong cart
// Cần truyền vào userId, productid, soluong
export const updateCart = async (req, res) => {
    const item = req.body;
    try {
        const order = await cart.findOne({ makh: item.userId });
        const sp = await order.sanphams.find((i) => i.productid === item.productid);

        if (!order) {
            return res.status(404).send("Not found order!");
        }

        if (!sp) {
            return res.status(404).send("Not found product in cart!");
        }

        sp.soluong = item.soluong;
        order.tongtrigia = order.sanphams.reduce((acc, currentValue) => {
            return acc + currentValue.price * currentValue.soluong;
        }, 0);
        order.markModified('sanphams');
        await order.save();
        res.send(order);
    } catch (e) {
        res.status(500).send(e);
    }
};

// Delete order: truyen makh
export const deleteGH = async (req, res) => {
    try {
        const order = await cart.findOneAndDelete({ userId: req.params.userId });
        if (!order) {
            return res.status(404).send("Not found order!");
        }

        res.send(order);
    } catch (e) {
        res.status(500).send(e);
    }
};