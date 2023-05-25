import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  makh: {
    type: String,
    require: true,
    trim: true,
  },
  tenkh: {
    type: String,
    require: true,
  },
  serviceTypes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ServiceType',
      required: true,
    },
  ],

  s_date: {
    type: String,
  },
  total: {
    type: Number,
  },
});

export default mongoose.model.Services ||
  mongoose.model('Service', serviceSchema);
