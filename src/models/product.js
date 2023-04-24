import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  productid: { type: String, require: true },
  name: { type: String, require: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ["Nhẫn", "Dây chuyền", "Bông tai"] },
  state: { type: String, default: "Còn hàng" },
  quantity_sold: { type: Number, default: "0" },
  details: {
    type: Map,
    of: String,
    default: "Chưa có thông tin",
  },
});

const Product = mongoose.model("Product", userSchema);
export default Product;
