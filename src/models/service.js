import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
	s_id: {
		type: String,
		unique: true,
	},
	
	makh: {
        type: String,  
        require: true,
        trim: true
    },
	serviceTypes: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceType', required: true }],

	
	s_date: {
		type: String,
		required: true,
	},

});

const Service = mongoose.model("Service",serviceSchema);
export default Service;