import Service from "../models/service.js";


  //Lấy danh sách dịch vụ
  export const getAllService = async(req, res)=>{
    try {
      const service = await Service.find();
      if (!service) {
        throw "error";
      }
      return res.status(201).json(service);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
 // Lấy theo Objectid:

export const getServiceById = async(req, res)=>{
    try {
        
        const service = await Service.findById({_id:req.params.id})
        if (!service)
            res.status(404).send("Not found!")
        res.send(service)
    } catch (e) {
        res.status(500).send(e)
    }
}

export const getServiceBySID = async (req,res)=> {
  try{
      const sid = req.params.s_id;
      const service = await Service.find({s_id: sid})
      res.send(service);
  }
  catch(e){
      res.status(500).send(e)
  }
}
  //Thêm 
  
    export const addService = async(req, res)=>{
    try {
      console.debug("Adding service...");
      const service = new Service({ ...req.body });
      await service.save();
      return res.status(201).json(service);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
//   //Cập nhật

    export const updateService = async(req, res)=>{
    try {
      console.debug("Updating service...");
      const updatedService = await Service.findByIdAndUpdate({_id:req.params.id},
        {...req.body,
          //tính toán s_total và s_payLeft
        total:req.body.price*req.body.number,  payLeft:req.body.price*req.body.number-req.body.payFirst} ,
        {
        new: true,
      });
      
      if (!updatedService) {
        return res.status(404).json({ error: "Service not found." });
      }
      return res.json(updatedService);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  //Xóa

    export const deleteService = async(req, res)=>{
    try {
      console.debug("Deleting service...");
      const deletetService = await Service.findOneAndDelete({_id:req.params.id});
      if (!deletetService) {
        return res.status(404).json({ error: "Service not found." });
      }
      return res.json(deletetService);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

