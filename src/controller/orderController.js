import Order from "../models/order.js";
import User from "../models/user.js"

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
        const order = await Order.find({makh: kh.userid})
        if (!order)
            res.status(404).send("Not found!")
        res.send(order)
    } catch (e) {
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

export const updateOrder= async(req,res) => {
    const updates=Object.keys(req.body)
    const allowUpdates=["makh","sanphams","ngaylap","tinhtrang","diachigiaohang"]
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
        res.send(hd);
    } catch (e) {
        res.status(500).send(e)
    }
}

