import HoaDon from "../models/hoadon.js";
import Order from "../models/order.js";

export const getAllHoaDon= async(req,res)=>{
    try{
        const listHoaDon= await HoaDon.find({});
        res.send(listHoaDon);
    } catch(e){
        res.status(500).send(e)
    }
} 

export const getHoaDonById = async(req, res)=>{
    // const { id } = req.params
    try {
        const hoadon = await HoaDon.findOne({_id:req.params.id})
        if (!HoaDon)
            res.status(404).send("Not found!")
        res.send(hoadon)
    } catch (e) {
        res.status(500).send(e)
    }
}

export const addHoaDon = async(req, res) => {
    const {madh, manv, ngayxuathd, diachigiaohang} = req.body
    const donhang = await Order.findOne({MADH:madh}) 
    const hoadonData = {
        makh: donhang.MAKH,
        manv: manv,
        ngayxuathd: ngayxuathd,
        trigia: donhang.TONGTRIGIA,
        diachigiaohang: diachigiaohang,
    }
    try {
        const hoadon = new HoaDon(hoadonData)
        await hoadon.save()
        res.send(hoadon)
    } catch(e){
        res.status(500).send(e)
    }
}

export const updateHoadon= async(req,res) => {
    const updates=Object.keys(req.body)
    const allowUpdates=["makh","manv","ngayxuathd","tinhtrang","trigia","diachigiaohang"]
    const isValidOperation=updates.every((update)=>{
        return allowUpdates.includes(update)
    })
    if(!isValidOperation) return res.status(400).send("error: Invalid updates!")
    
    try{
        const hd=await HoaDon.findOne({_id: req.params.id})
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

export const deleteHoaDon = async(req, res) => {
    try {
        const hoadon = await HoaDon.findOne({_id:req.params.id})
        if(!HoaDon)
            res.status(404).send("Not found!")
        else
            HoaDon.deleteOne({_id:req.params.id})
        res.send("Da xoa thanh cong");
    } catch (e) {
        res.status(500).send(e)
    }
}

