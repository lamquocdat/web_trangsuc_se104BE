import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, require: true },
  name: { type: String, require: true },
  gender: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const User = mongoose.model("User", userSchema);
export default User;
