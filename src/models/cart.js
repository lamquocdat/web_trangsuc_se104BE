import mongoose from "mongoose";
import validator from "validator";

const cartSchema = new mongoose.Schema(
    {
        makh: {
            type: String,
            required: true,
        },
        tongtrigia: {
            type: Number,
            required: false,
        },
        sanphams: {
            type: Array,
            required: false,
        },
    },
    { timestamps: true }
);
const cart = mongoose.model("carts", cartSchema);
export default cart;