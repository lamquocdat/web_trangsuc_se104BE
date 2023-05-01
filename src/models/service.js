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
	makh: {
        type: String,  
        require: true,
        trim: true
    },
	serviceTypes: [{
        name: {
            type: String,
            require: true,
        },
        number: {
            type: Number,
            require: true,
            default: 1,
        },
     
        price: {
            type: Number,
            require: true,
        },
		total: {
            type: Number,
            require: true,
			default: function() {
				return this.price * this.number
			  }
        },
        payFirst:{
            type: Number,
            require: true,
        },
		payLeft:{
            type: Number,
            require: true,
			default: function() {
				return this.total - this.payFirst
			  }
        },
		ngaygiao: {
			type: String,
			required: true,
		},
		tinhtrang: {
			type: Boolean,
			required: true,
		},
    }],
	
	s_number:{
		type: Number,
		require: true,
	},
	s_date: {
		type: String,
		required: true,
	},
	s_status: {
		type: Boolean,
		required: true,
	},
});

const Service = mongoose.model("Service",serviceSchema);
export default Service;