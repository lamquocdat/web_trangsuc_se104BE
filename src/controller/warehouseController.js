import Warehouse from "../models/warehouse.js";

export const getAllTonKho= async(req,res)=>{
    try{
        const listTonKho= await Warehouse.find({});
        res.send(listTonKho);
    } catch(e){
        res.status(500).send(e)
    }
} 

export const getTonKhoById = async(req, res)=>{
    // const { id } = req.params
    try {
        const tonkho = await Warehouse.findOne({_id:req.params.id})
        if (!Warehouse)
            res.status(404).send("Not found!")
        res.send(tonkho)
    } catch (e) {
        res.status(500).send(e)
    }
}

//dang sua


export const deleteTonKho = async(req, res) => {
    try {
        const tonkho = await Warehouse.findOne({_id:req.params.id})
        if(!Warehouse)
            res.status(404).send("Not found!")
        else
        Warehouse.deleteOne({_id:req.params.id})
        res.send("Da xoa thanh cong");
    } catch (e) {
        res.status(500).send(e)
    }
}