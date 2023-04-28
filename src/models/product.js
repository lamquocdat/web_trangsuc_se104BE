import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productid: { type: String, require: true },
  name: { type: String, require: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ["Nhẫn", "Dây chuyền", "Bông tai"] },
  details: {
    type: Map,
    of: String,
    default: "Chưa có thông tin",
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
