import Order from "../models/order.js";
import User from "../models/user.js"
 import fs from 'fs';

export const getAllOrder= async(req,res)=>{
    try{
        const listOrder= await Order.find({});
        res.send(listOrder);
    } catch(e){
        res.status(500).send(e)
    }
} 

export const getOrderById = async(req, res)=>{
    try {
        const order = await Order.findOne({_id:req.params.id})
        if (!order)
            res.status(404).send("Not found!")
        res.send(order)
    } catch (e) {
        res.status(500).send(e)
    }
}

export const getOrderByKH = async(req, res)=>{
    try {
        const regex = new RegExp(req.params.ten, 'i');
        const kh = await User.findOne({name: regex})
        if (!kh) {
            res.status(404).send("Không tìm thấy khách hàng (user) phù hợp!");
            return;
        }
        const order = await Order.find({userId: kh.userId})
        if (!order)
            res.status(404).send("Not found!")
        res.send(order)
    } catch (e) {
        res.status(500).send(e)
    }
}

export const getOrderByStatus = async(req,res)=> {
    try{
        const status = req.params.tinhtrang;
        const orders = await Order.aggregate([
            // Tìm các đơn hàng với tình trạng được truyền vào
            { $match: { tinhtrang: status } },
            
            // Liên kết với bảng user để lấy thông tin tên của khách hàng
            {
              $lookup: {
                from: "users", // Tên bảng user
                localField: "userId", // Trường liên kết trong bảng Order
                foreignField: "userId", // Trường liên kết trong bảng User
                as: "user" // Tên đối tượng được liên kết
              }
            },
            
            // Đổi tên trường userId thành name để hiển thị tên khách hàng thay vì mã khách hàng
            { $addFields: { "name": { $arrayElemAt: ["$user.name", 0] } } },
            { $unset: ["user"] }
          ]);

        res.send(orders)
    } catch (e) {
        res.status(500).send(e)
    }
}

export const getOrderByMahd = async (req,res)=> {
    try{
        const hd = req.params.mahd;
        const order = await Order.find({mahd: hd})
        res.send(order);
    }
    catch(e){
        res.status(500).send(e)
    }
}

export const addOrder = async(req, res) => {
    const hd= new Order(req.body)
    try{
        if(await (await Order.find({})).length!==0){
            const hdLast= await (await Order.find({})).splice(-1)
            const mahdLast= hdLast[0].mahd.substring(2) || "0" 
            const newmahd="HD"+ Number(Number(mahdLast)+1)
            hd.mahd=newmahd
        }
        await hd.save()
        res.status(201).send(hd)
    }catch(e){
        res.status(400).send(e)
    }
}

export const updateOrder=  async(req,res) => {
    const updates=Object.keys(req.body)
    const allowUpdates=["userId", "hinhanh", "sanphams", "ngaylap", "tinhtrang", "diachigiaohang"]
    const isValidOperation=updates.every((update)=>{
        return allowUpdates.includes(update)
    })
    if(!isValidOperation) return res.status(400).send("error: Invalid updates!")
    
    try{
        const hd=await Order.findOne({_id: req.params.id})
        if(!hd) return res.status(404).send()
        
        updates.forEach((update)=>{
            hd[update]=req.body[update]
        })

        // Sử dụng thư viện fs để lưu file ảnh vào thư mục confirms/
        if (req.file) {
            const fileName = req.file.filename;
            const imagePath = `confirms/${fileName}`;
            
            // Sử dụng thư viện fs để lưu file ảnh vào thư mục confirms/
            fs.rename(req.file.path, `src/${imagePath}`, function(err) {
                if (err) {
                    console.log(err);
                    return res.status(500).send({ error: "Could not save image" });
                }
            });
            hd.hinhanh = imagePath; // lưu đường dẫn của file ảnh vào đối tượng order
        }
        await hd.save()
        res.send(hd)
    } catch(e){
        res.status(500).send(e)  
    }
}

export const deleteOrder = async(req, res) => {
    try {
        const hd = await Order.findByIdAndDelete({_id: req.params.id})
        if(!hd)
            res.status(404).send("Not found!")
        if (hd.hinhanh) {
            fs.unlink(`./src/${hd.hinhanh}`, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        res.send(hd);
    } catch (e) {
        res.status(500).send(e)
    }
}

