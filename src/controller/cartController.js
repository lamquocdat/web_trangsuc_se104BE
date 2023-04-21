import cart from "../models/cart.js";

// export const getAllBH = async (req, res) => {
//     try {
//         const listBH = await cart.find({});
//         res.send(listBH);
//     } catch (e) {
//         res.status(500).send(e);
//     }
// };

// Get Cart By Makh: truyền makh
export const getCartByMaKH = async (req, res) => {
    const makh = req.body.makh;
    try {
        const order = await cart.findOne({ makh: makh });
        if (!order) {
            return res.status(404).send("Not found");
        }
        res.send(order);
    } catch (e) {
        res.status(500).send(e);
    }
};

// Add Product vào Order: truyền makh, masp, mausac, soluong
export const addSpToCart = async (req, res) => {
    const item = req.body;
    try {
        const kh = await cart.findOne({ makh: item.makh });
        const sp = await Product.findOne({ masp: item.masp });
        if (!sp) {
            return res.status(404).send("Not found product");
        }

        const obj = {
            masp: sp.masp,
            image: sp.image,
            name: sp.name,
            gia: sp.gia,
            mausac: item.mausac,
            soluong: item.soluong,
        };

        if (!kh) {
            const order = new cart();
            order.makh = item.makh;
            order.sanphams.push(obj);
            order.tongtrigia = order.sanphams.reduce((acc, currentValue) => {
                return acc + currentValue.gia * currentValue.soluong;
            }, 0);

            await order.save();
            res.status(201).send(order);
        } else {
            kh.makh = item.makh;
            kh.sanphams.push(obj);
            await kh.save();
            res.status(201).send(kh);
        }
    } catch (e) {
        res.status(400).send(e);
    }
};

// Delete sp from products: truyền makh, masp
export const deleteSp = async (req, res) => {
    const item = req.body;
    try {
        const order = await cart.findOne({ makh: item.makh });
        if (!order) {
            return res.status(404).send("Not found Customer");
        }

        order.sanphams = order.sanphams.filter((sp) => sp.masp !== item.masp);
        order.tongtrigia = order.sanphams.reduce((acc, currentValue) => {
            return acc + currentValue.gia * currentValue.soluong;
        }, 0);

        order.save();
        res.send(order);
    } catch (e) {
        res.status(500).send(e);
    }
};

// Update so luong sp trong cart
// Cần truyền vào makh, masp, soluong
export const updateCart = async (req, res) => {
    const updates = Object.keys(req.body);
    const item = req.body;
    // const allowUpdates = ["soluong"];
    // const isValidOperation = updates.every((update) => {
    //     return allowUpdates.includes(update);
    // });

    // if (!isValidOperation) {
    //     return res.status(400).send("error: Invalid updates!");
    // }
    try {
        const order = await cart.findOne({ makh: item.makh });
        const sp = await order.sanphams.find((i) => i.masp === item.masp);

        if (!order) {
            return res.status(404).send("Not found order!");
        }

        if (!sp) {
            return res.status(404).send("Not found product in cart!");
        }

        // updates.forEach((update) => {
        //     // order[update] = req.body[update];
        //     sp[update] = item.soluong;
        // });

        sp.soluong = item.soluong;
        order.tongtrigia = order.sanphams.reduce((acc, currentValue) => {
            return acc + currentValue.gia * currentValue.soluong;
        }, 0);

        await order.save();
        res.send(order);
    } catch (e) {
        res.status(500).send(e);
    }
};

// Delete order: truyen makh
export const deleteGH = async (req, res) => {
    try {
        const order = await cart.findOne({ makh: req.body.makh });
        if (!order) {
            return res.status(404).send("Not found order!");
        }

        res.send(order);
    } catch (e) {
        res.status(500).send(e);
    }
};

// var arr = [
//     {
//         name: "Trung",
//         soluong: 1,
//         gia: 1000
//     },
//     {
//         name: "Linh",
//         soluong: 2,
//         gia: 1500
//     },
// ]
// var obj = arr.find(i => i.name === "Trung");
// // obj.soluong = 0;
// arr = arr.filter(i => i.name !== "Trung")
// var sum = arr.reduce((acc, currentValue) => {
//     return acc + currentValue.gia * currentValue.soluong;
// }, 0);
// console.log(arr);
// console.log(sum);