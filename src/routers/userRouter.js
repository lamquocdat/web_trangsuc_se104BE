import express from "express";
const router = express.Router();
import UserController from "../controller/userController.js";

router
  .get("/user", UserController.getAllUser)
  .get("/user/:id", UserController.getUserById)
  .post("/user", UserController.addUser)
  .put("/user/:id", UserController.updateUser)
  .delete("/user/:id", UserController.deleteUser);

export default router;
