import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
	s_id: {
		type: String,
		unique: true,
	},
	s_name: {
		type: String,
		required: true,
	},
	s_price: {
		type: String,
		required: true,
	},
	s_desc: {
		type: String,
		required: true,
	},
});

const Service = mongoose.model("Service",serviceSchema);
export default Service;