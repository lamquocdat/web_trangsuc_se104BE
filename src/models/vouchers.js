import mongoose from "mongoose";

const vouchersSchema = new mongoose.Schema({
  vouchersId: { type: String, require: true },
  createdAt: { type: Date, require: true },
  production: { type: String, require: true },
  address: { type: String, require: true },
  PhoneNumber: { type: String, require: true },
  products: [
    {
      name: { type: String, require: true },
      price: { type: Number, required: true },
      category: { type: String, enum: ["Nhẫn", "Dây chuyền", "Bông tai"] },
      amount: { type: Number, default: "10" },
      Unit: { type: String, default: "Cái" },
    },
  ],
});

const Vouchers = mongoose.model("Vouchers", vouchersSchema);
export default Vouchers;
