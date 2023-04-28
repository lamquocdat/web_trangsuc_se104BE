import Vouchers from "../models/vouchers.js";

export default class VouchersController {
  //Lấy danh sách người dùng:
  static async getAllVouchers(req, res) {
    try {
      const vouchers = await Vouchers.find();
      if (!vouchers) {
        throw "error";
      }
      return res.status(201).json(vouchers);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  //Lấy người dùng theo id:
  static async getVouchersById(req, res) {
    try {
      const { id } = req.params;
      const vouchers = await Vouchers.findById(id);
      if (!vouchers) {
        throw "error";
      }
      return res.status(201).json(vouchers);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  //Thêm người dùng:
  static async addVouchers(req, res) {
    try {
      console.debug("Adding vouchers...");
      const vouchers = new Vouchers({ ...req.body });
      await vouchers.save();
      return res.status(201).json(vouchers);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  //Cập nhật thông tin người dùng:
  static async updateVouchers(req, res) {
    try {
      console.debug("Updating Vouchers...");
      const { id } = req.params;
      const updatedVouchers = await Vouchers.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedVouchers) {
        return res.status(404).json({ error: "Vouchers not found." });
      }
      return res.json(updatedVouchers);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  //Xóa người dùng:
  static async deleteVouchers(req, res) {
    try {
      console.debug("Deleting Vouchers...");
      const { id } = req.params;
      const deletedVouchers = await Vouchers.findOneAndDelete(id);
      if (!deletedVouchers) {
        return res.status(404).json({ error: "Vouchers not found." });
      }
      return res.json(deletedVouchers);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
