import Sample from '../models/sample.js'

 export const getSample= async(req,res)=>{
    try{
        const listSample= await Sample.find({});
        res.send(listSample);
    }catch(e){
        res.status(500).send(e)
    }
    
}
